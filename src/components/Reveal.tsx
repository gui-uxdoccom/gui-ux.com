import { useRef, type ReactNode } from 'react'
import { motion, useInView } from 'framer-motion'

const EASE = [0.65, 0, 0.35, 1] as const

/** Masked line reveal — text slides up from behind an overflow mask.
 *  The in-view observer sits on the outer mask (the inner span is clipped,
 *  so observing it directly would never intersect). */
export function MaskReveal({ children, delay = 0, className }: { children: ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-8% 0px' })
  return (
    <span ref={ref} className={`mask-line ${className ?? ''}`}>
      <motion.span
        initial={false}
        animate={{ y: inView ? '0%' : '110%' }}
        transition={{ duration: 0.9, delay, ease: EASE }}
      >
        {children}
      </motion.span>
    </span>
  )
}

/** Soft fade-and-rise on scroll into view. */
export function FadeUp({ children, delay = 0, className, y = 28 }: { children: ReactNode; delay?: number; className?: string; y?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10% 0px' }}
      transition={{ duration: 0.85, delay, ease: EASE }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

/** Hairline that draws itself horizontally. */
export function DrawnLine({ className, delay = 0 }: { className?: string; delay?: number }) {
  return (
    <motion.div
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true, margin: '-10% 0px' }}
      transition={{ duration: 1.1, delay, ease: EASE }}
      className={`hairline h-px w-full origin-left ${className ?? ''}`}
    />
  )
}

/** Section heading: index slides in first, the label wipes in behind a mask
 *  letter by letter, then the hairline draws itself. A small ceremony at
 *  every section boundary. */
export function SectionHead({ index, label }: { index: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-10% 0px' })
  return (
    <div ref={ref} className="mb-14 md:mb-20">
      <div className="flex items-baseline gap-4">
        <motion.span
          initial={{ opacity: 0, x: -12 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, ease: EASE }}
          className="label-caps text-[hsl(var(--verde))]"
        >
          ({index})
        </motion.span>
        <span className="mask-line">
          <motion.span
            initial={false}
            animate={{ y: inView ? '0%' : '110%' }}
            transition={{ duration: 0.7, delay: 0.15, ease: EASE }}
          >
            <span className="label-caps">{label}</span>
          </motion.span>
        </span>
      </div>
      <motion.div
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 1.1, delay: 0.35, ease: EASE }}
        className="hairline mt-5 h-px w-full origin-left"
      />
    </div>
  )
}

export { EASE }
