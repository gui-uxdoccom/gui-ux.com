import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring, useTransform, useVelocity } from 'framer-motion'

export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false)
  const [variant, setVariant] = useState<'default' | 'hover' | 'view'>('default')
  const [label, setLabel] = useState('')

  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const ringX = useSpring(x, { stiffness: 400, damping: 35, mass: 0.6 })
  const ringY = useSpring(y, { stiffness: 400, damping: 35, mass: 0.6 })

  // jelly: the ring squashes in the direction of travel and springs back
  const vx = useVelocity(ringX)
  const vy = useVelocity(ringY)
  const svx = useSpring(vx, { stiffness: 300, damping: 30 })
  const svy = useSpring(vy, { stiffness: 300, damping: 30 })
  const rotate = useTransform([svx, svy], ([a, b]: number[]) => (Math.atan2(b, a) * 180) / Math.PI)
  const stretch = useTransform([svx, svy], ([a, b]: number[]) => {
    const speed = Math.min(Math.hypot(a, b), 3000)
    return 1 + (speed / 3000) * 0.22
  })
  const squash = useTransform(stretch, (s) => 1 - (s - 1) * 0.6)

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches
    if (!fine) return
    setEnabled(true)

    const move = (e: MouseEvent) => {
      x.set(e.clientX)
      y.set(e.clientY)
      const target = (e.target as HTMLElement)?.closest?.('[data-cursor]') as HTMLElement | null
      if (target) {
        const type = target.dataset.cursor
        if (type === 'view') {
          setVariant('view')
          const lbl = target.dataset.cursorLabel || 'View'
          setLabel(lbl === 'On request' ? 'Ask\u000Ame' : lbl)
        } else {
          setVariant('hover')
        }
      } else {
        setVariant('default')
      }
    }
    window.addEventListener('mousemove', move, { passive: true })
    return () => window.removeEventListener('mousemove', move)
  }, [x, y])

  if (!enabled) return null

  return (
    <>
      {/* dot */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[100] h-1.5 w-1.5 rounded-full bg-[hsl(var(--verde))]"
        style={{ x, y, translateX: '-50%', translateY: '-50%' }}
        animate={{ opacity: variant === 'view' ? 0 : 1 }}
        transition={{ duration: 0.2 }}
      />
      {/* ring / label */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[100] flex items-center justify-center rounded-full"
        style={{ x: ringX, y: ringY, translateX: '-50%', translateY: '-50%' }}
        animate={{
          width: variant === 'view' ? 84 : variant === 'hover' ? 48 : 28,
          height: variant === 'view' ? 84 : variant === 'hover' ? 48 : 28,
          backgroundColor: variant === 'view' ? 'hsl(161 68% 20% / 1)' : 'hsl(161 68% 20% / 0)',
          borderColor: 'hsl(161 68% 20% / 0.5)',
        }}
        transition={{ type: 'spring', stiffness: 350, damping: 28 }}
        initial={false}
      >
        <motion.div
          className="absolute inset-0 rounded-full border"
          style={{
            borderColor: 'inherit',
            opacity: variant === 'view' ? 0 : 1,
            rotate,
            scaleX: stretch,
            scaleY: squash,
          }}
        />
        {variant === 'view' && (
          <span className="whitespace-pre-line px-3 text-center text-[10px] font-medium uppercase leading-[1.5] tracking-[0.16em] text-[hsl(var(--paper))]">
            {label}
          </span>
        )}
      </motion.div>
    </>
  )
}
