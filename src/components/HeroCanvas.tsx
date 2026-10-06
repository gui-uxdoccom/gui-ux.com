import { useEffect, useRef } from 'react'
import * as THREE from 'three'

/**
 * Abstract hero sculpture: a wireframe torus knot (one unbroken line, like the
 * career this site narrates) in faint ink, with verde particle sparks and
 * drifting dust. It idles with a slow rotation and gentle breathing, rotates
 * and rises as the page scrolls, and tilts toward the cursor.
 *
 * Rendered behind the hero type at low opacity so it never fights the words.
 * Honours prefers-reduced-motion with a single static frame, pauses when the
 * hero scrolls out of view, and caps pixel ratio for battery life.
 */
export default function HeroCanvas() {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100)
    camera.position.set(0, 0, 9)

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75))
    mount.appendChild(renderer.domElement)

    const group = new THREE.Group()
    scene.add(group)

    const ink = new THREE.Color().setHSL(30 / 360, 0.08, 0.09)
    const verde = new THREE.Color().setHSL(161 / 360, 0.65, 0.4)
    const verdeDeep = new THREE.Color().setHSL(161 / 360, 0.68, 0.2)

    // the knot, as ink wireframe — coarse enough that individual lines read
    const knotGeo = new THREE.TorusKnotGeometry(2.15, 0.6, 170, 20, 2, 3)
    const wire = new THREE.LineSegments(
      new THREE.WireframeGeometry(knotGeo),
      new THREE.LineBasicMaterial({ color: ink, transparent: true, opacity: 0.1 }),
    )
    group.add(wire)

    // a tighter second pass, slightly greener, rotated for depth
    const wire2 = new THREE.LineSegments(
      new THREE.WireframeGeometry(new THREE.TorusKnotGeometry(2.15, 0.6, 100, 11, 2, 3)),
      new THREE.LineBasicMaterial({ color: verdeDeep, transparent: true, opacity: 0.05 }),
    )
    wire2.rotation.set(0.4, 0.2, 0)
    group.add(wire2)

    // verde sparks scattered along the knot's surface
    const sparkGeo = new THREE.TorusKnotGeometry(2.15, 0.6, 140, 14, 2, 3)
    const sparks = new THREE.Points(
      sparkGeo,
      new THREE.PointsMaterial({ color: verde, size: 0.04, transparent: true, opacity: 0.5 }),
    )
    group.add(sparks)

    // ambient dust drifting around the form
    const DUST = 320
    const dustPos = new Float32Array(DUST * 3)
    for (let i = 0; i < DUST; i++) {
      const r = 3 + Math.random() * 3.2
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      dustPos[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      dustPos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      dustPos[i * 3 + 2] = r * Math.cos(phi)
    }
    const dustGeo = new THREE.BufferGeometry()
    dustGeo.setAttribute('position', new THREE.BufferAttribute(dustPos, 3))
    const dust = new THREE.Points(
      dustGeo,
      new THREE.PointsMaterial({ color: ink, size: 0.02, transparent: true, opacity: 0.35 }),
    )
    group.add(dust)

    // responsive framing: wide screens push the form to the right half,
    // small screens sink it so the type keeps clear air
    let baseY = 0
    const frame = () => {
      const w = mount.clientWidth
      const h = mount.clientHeight
      renderer.setSize(w, h)
      camera.aspect = w / h
      const wide = w >= 1024
      group.position.x = wide ? 2.9 : 0
      group.position.z = wide ? 0 : -1.5
      baseY = wide ? 0 : -0.9
      const s = wide ? 1 : 0.8
      group.scale.setScalar(s)
      camera.updateProjectionMatrix()
    }
    frame()
    const ro = new ResizeObserver(frame)
    ro.observe(mount)

    // interaction state
    let scrollProgress = 0
    let easedScroll = 0
    const onScroll = () => {
      const vh = window.innerHeight || 1
      scrollProgress = Math.min(Math.max(window.scrollY / vh, 0), 1.2)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()

    let targetRX = 0
    let targetRY = 0
    let rx = 0
    let ry = 0
    const onPointer = (e: PointerEvent) => {
      targetRY = (e.clientX / window.innerWidth - 0.5) * 0.45
      targetRX = (e.clientY / window.innerHeight - 0.5) * 0.3
    }
    window.addEventListener('pointermove', onPointer, { passive: true })

    // pause the loop when the hero is off-screen
    let inView = true
    const io = new IntersectionObserver(([entry]) => (inView = entry.isIntersecting), { threshold: 0 })
    io.observe(mount)

    let raf = 0
    const clock = new THREE.Clock()

    const draw = () => {
      const t = clock.getElapsedTime()
      const breathe = 1 + Math.sin(t * 0.55) * 0.02

      // ease toward scroll and pointer targets so motion feels physical
      easedScroll += (scrollProgress - easedScroll) * 0.06
      rx += (targetRX - rx) * 0.045
      ry += (targetRY - ry) * 0.045

      // idle spin + scroll-driven rotation and lift
      group.rotation.y = t * 0.12 + easedScroll * Math.PI * 1.1 + ry
      group.rotation.x = Math.sin(t * 0.09) * 0.12 + easedScroll * 0.55 + rx
      group.position.y = baseY + easedScroll * 2.4
      const base = mount.clientWidth >= 1024 ? 1 : 0.8
      group.scale.setScalar(base * breathe)

      sparks.rotation.z = t * 0.05
      dust.rotation.y = -t * 0.02

      renderer.render(scene, camera)
    }

    if (reduced) {
      // one considered frame, no motion
      group.rotation.set(0.35, 0.8, 0)
      renderer.render(scene, camera)
    } else {
      const loop = () => {
        raf = requestAnimationFrame(loop)
        if (inView) draw()
      }
      loop()
    }

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      io.disconnect()
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('pointermove', onPointer)
      knotGeo.dispose()
      sparkGeo.dispose()
      dustGeo.dispose()
      wire.geometry.dispose()
      ;(wire.material as THREE.Material).dispose()
      wire2.geometry.dispose()
      ;(wire2.material as THREE.Material).dispose()
      ;(sparks.material as THREE.Material).dispose()
      ;(dust.material as THREE.Material).dispose()
      renderer.dispose()
      mount.removeChild(renderer.domElement)
    }
  }, [])

  return <div ref={mountRef} className="h-full w-full" aria-hidden />
}
