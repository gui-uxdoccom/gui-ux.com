import { useEffect } from 'react'
import Lenis from 'lenis'
import CustomCursor from '@/components/CustomCursor'
import Nav from '@/sections/Nav'
import Hero from '@/sections/Hero'
import Projects from '@/sections/Projects'
import Experience from '@/sections/Experience'
import Blog from '@/sections/Blog'
import About from '@/sections/About'
import Footer from '@/sections/Footer'

export default function Home() {
  useEffect(() => {
    // respect reduced motion: no smooth-scroll hijacking
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const lenis = new Lenis({ duration: 1.15, smoothWheel: true })
    let raf = 0
    const loop = (time: number) => {
      lenis.raf(time)
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    return () => {
      cancelAnimationFrame(raf)
      lenis.destroy()
    }
  }, [])

  return (
    <div className="grain relative">
      <a href="#work" className="skip-link">
        Skip to content
      </a>
      <CustomCursor />
      <Nav />
      <main id="content">
        <Hero />
        <Projects />
        <Experience />
        <Blog />
        <About />
        <Footer />
      </main>
    </div>
  )
}
