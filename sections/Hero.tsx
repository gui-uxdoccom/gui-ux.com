import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import { motion, useInView, useScroll, useTransform, animate, useAnimationControls } from 'framer-motion'
import { EASE } from '@/components/Reveal'
import { stats } from '@/data/content'
import { trackContact } from '@/lib/analytics'

// three.js loads off the critical path, after first paint
const HeroCanvas = lazy(() => import('@/components/HeroCanvas'))

/** One word of the hero name: per-letter staggered entrance, a wave that
 *  ripples through the letters on hover, and letters that blush green
 *  when touched directly. */
function AnimatedWord({ word, delay, controls }: { word: string; delay: number; controls: ReturnType<typeof useAnimationControls> }) {
  return (
    <>
      {word.split('').map((ch, i) => (
        <motion.span
          key={i}
          custom={i}
          initial={{ y: '115%' }}
          animate={controls}
          variants={{
            enter: (i: number) => ({
              y: '0%',
              transition: { duration: 0.9, delay: delay + i * 0.035, ease: EASE },
            }),
            wave: (i: number) => ({
              y: ['0%', '-9%', '0%'],
              transition: { duration: 0.55, delay: i * 0.035, ease: 'easeInOut' },
            }),
          }}
          whileHover={{ color: 'hsl(161 68% 20%)', transition: { duration: 0.25 } }}
          className="inline-block"
        >
          {ch}
        </motion.span>
      ))}
    </>
  )
}

function Stat({ value, suffix, label, decimals = 0, delay }: { value: number; suffix: string; label: string; decimals?: number; delay: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-10% 0px' })
  const [display, setDisplay] = useState('0')

  useEffect(() => {
    if (!inView) return
    const controls = animate(0, value, {
      duration: 2.1,
      delay,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setDisplay(v.toFixed(decimals)),
    })
    return () => controls.stop()
  }, [inView, value, decimals, delay])

  return (
    <div ref={ref}>
      <div className="font-display text-[2.7rem] font-light leading-none md:text-[4.9rem]">
        {display}
        <span className="text-[hsl(var(--verde))]">{suffix}</span>
      </div>
      <div className="label-caps mt-3">{label}</div>
    </div>
  )
}

const clients = ['Public Investment Fund', 'First Abu Dhabi Bank', 'Etisalat', 'Dubai Airports', 'Unimed', 'HP']

export default function Hero() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const yTitle = useTransform(scrollYProgress, [0, 1], [0, 120])
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])
  const canvasOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0])

  const nameControls = useAnimationControls()
  useEffect(() => {
    nameControls.start('enter')
  }, [nameControls])

  return (
    <section ref={ref} className="relative flex min-h-[100svh] flex-col justify-between overflow-hidden px-6 pt-28 md:px-10 md:pt-32">
      {/* abstract 3D sculpture: behind the words, moving with the scroll */}
      <motion.div style={{ opacity: canvasOpacity }} className="pointer-events-none absolute inset-0 z-0 opacity-40 lg:opacity-100">
        <Suspense fallback={null}>
          <HeroCanvas />
        </Suspense>
      </motion.div>

      <motion.div style={{ y: yTitle, opacity }} className="relative z-10 mx-auto w-full max-w-[1400px]">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="mb-8 flex items-center gap-3"
        >
          <span className="pulse-dot inline-block h-2 w-2 rounded-full bg-[hsl(var(--verde))]" />
          <span className="label-caps">UX &amp; Digital Transformation · Riyadh, KSA</span>
        </motion.div>

        <div className="grid gap-10 lg:grid-cols-[1.5fr_1fr] lg:gap-16">
          <div>
            {/* the name stays the visual anchor; the semantic h1 below carries the claim */}
            <div
              onMouseEnter={() => nameControls.start('wave')}
              aria-label="Guilherme Rodrigues"
              className="font-display text-[13.5vw] font-light leading-[0.98] tracking-[-0.02em] sm:text-[11vw] lg:text-[7.2vw]"
            >
              <span className="mask-line">
                <span className="block whitespace-nowrap">
                  <AnimatedWord word="Guilherme" delay={0.15} controls={nameControls} />
                </span>
              </span>
              <span className="mask-line">
                <span className="block whitespace-nowrap">
                  <AnimatedWord word="Rodrigues" delay={0.32} controls={nameControls} />
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: [1, 1.35, 1] }}
                    transition={{ scale: { duration: 2.2, repeat: Infinity, ease: 'easeInOut', delay: 1.6 } }}
                    className="ml-[0.02em] inline-block text-[hsl(var(--verde))]"
                  >
                    .
                  </motion.span>
                </span>
              </span>
            </div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.65, duration: 0.9, ease: EASE }}
              className="mt-8 max-w-2xl font-display text-2xl font-light leading-[1.25] text-[hsl(var(--ink))] md:mt-10 md:text-4xl md:leading-[1.2]"
            >
              Translating complex technology into seamless experiences that{' '}
              <span className="text-[hsl(var(--verde))]">drive results.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.9, ease: EASE }}
              className="mt-6 max-w-md text-[15px] leading-relaxed text-[hsl(var(--ink-soft))]"
            >
              I'm Guil. For 20+ years I've been crafting digital experiences across telecom, fintech and now a sovereign
              wealth fund in the Middle East. I use design thinking, GenAI and data to scale products to 1M+ users, and I
              still believe the human part does the heavy lifting.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.95, duration: 0.9, ease: EASE }}
              className="mt-8 flex flex-wrap items-center gap-4"
            >
              <a
                href="#work"
                data-cursor
                className="rounded-full bg-[hsl(var(--ink))] px-7 py-3.5 text-[13px] font-medium uppercase tracking-[0.14em] text-[hsl(var(--paper))] transition-colors duration-300 hover:bg-[hsl(var(--verde))]"
              >
                See the work
              </a>
              <a
                href="mailto:contact@gui-ux.com"
                data-cursor
                onClick={() => trackContact('hero')}
                className="link-sweep rounded-full border border-[hsl(var(--ink)/0.3)] px-7 py-3.5 text-[13px] font-medium uppercase tracking-[0.14em] transition-colors duration-300 hover:border-[hsl(var(--ink))]"
              >
                Start a conversation
              </a>
            </motion.div>
          </div>

          {/* the right half earns its place: who trusted the work */}
          <motion.aside
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.05, duration: 0.9, ease: EASE }}
            className="hidden lg:block"
          >
            <div className="label-caps mb-5">Two decades across</div>
            <ul className="divide-y divide-[hsl(var(--line))] border-y border-[hsl(var(--line))]">
              {clients.map((c) => (
                <li key={c} className="py-3.5 font-display text-xl font-light text-[hsl(var(--ink)/0.75)]">
                  {c}
                </li>
              ))}
            </ul>
            <p className="mt-5 text-[13px] leading-relaxed text-[hsl(var(--ink-soft))]">
              Currently Senior VP, Digital Experiences &amp; Platforms at the Public Investment Fund.
            </p>
          </motion.aside>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.15, duration: 1 }}
        className="relative z-10 mx-auto mt-16 w-full max-w-[1400px]"
      >
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 1.05, duration: 1, ease: EASE }}
          className="hairline h-px w-full origin-center"
        />
        <div className="grid grid-cols-3 gap-8 py-8 md:py-10">
          {stats.map((s, i) => (
            <Stat key={s.label} {...s} delay={0.1 * i} />
          ))}
        </div>
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 1.15, duration: 1, ease: EASE }}
          className="hairline h-px w-full origin-center"
        />
        <div className="flex items-center justify-end gap-6 py-5">
          <motion.span
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            className="label-caps flex shrink-0 items-center gap-2"
          >
            Scroll <span className="inline-block rotate-90">→</span>
          </motion.span>
        </div>
      </motion.div>
    </section>
  )
}
