import { useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { SectionHead, FadeUp, MaskReveal } from '@/components/Reveal'
import Magnetic from '@/components/Magnetic'
import { blogTopics, blogUrl } from '@/data/content'

const TILTS = ['md:-rotate-[1.2deg]', 'md:rotate-[0.8deg]', 'md:-rotate-[0.5deg]']
const BASE_ROTATE = [-1.2, 0.8, -0.5]

/** A notebook card that leans toward the cursor on pointer devices,
 *  like paper you're holding. On touch it keeps its printed tilt. */
function TiltCard({ index, children }: { index: number; children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)
  const px = useMotionValue(0.5)
  const py = useMotionValue(0.5)
  const sx = useSpring(px, { stiffness: 220, damping: 24, mass: 0.6 })
  const sy = useSpring(py, { stiffness: 220, damping: 24, mass: 0.6 })
  const base = BASE_ROTATE[index % BASE_ROTATE.length]
  const rotate = useTransform(sx, [0, 1], [base - 1.6, base + 1.6])
  const lift = useTransform(sy, [0, 1], [3, -3])

  const finePointer = typeof window !== 'undefined' && window.matchMedia('(pointer: fine)').matches

  const onMove = (e: React.MouseEvent) => {
    const r = ref.current?.getBoundingClientRect()
    if (!r) return
    px.set((e.clientX - r.left) / r.width)
    py.set((e.clientY - r.top) / r.height)
  }
  const onLeave = () => {
    px.set(0.5)
    py.set(0.5)
  }

  if (!finePointer) {
    return <div className={TILTS[index % TILTS.length]}>{children}</div>
  }

  return (
    <motion.div ref={ref} onMouseMove={onMove} onMouseLeave={onLeave} style={{ rotate, y: lift }}>
      {children}
    </motion.div>
  )
}

export default function Blog() {
  return (
    <section id="stories" className="px-6 py-28 md:px-10 md:py-40">
      <div className="mx-auto max-w-[1400px]">
        <SectionHead index="03" label="Stories · My blog" />

        <h2 className="mb-8 max-w-4xl font-display text-4xl font-light leading-[1.15] md:text-6xl">
          <MaskReveal>Sharing is caring.</MaskReveal>
          <MaskReveal delay={0.12}>
            I write <span className="text-[hsl(var(--verde))]">too.</span>
          </MaskReveal>
        </h2>

        <FadeUp className="mb-14 max-w-xl">
          <p className="text-[15px] leading-relaxed text-[hsl(var(--ink-soft))]">
            Every now and then I sit down and write about what I'm learning, building, or just thinking about. No
            corporate voice, just honest notes. Pick a pile:
          </p>
        </FadeUp>

        {/* notebook cards: a looser, more personal variation on the grid */}
        <div className="grid gap-8 md:grid-cols-3 md:gap-6 lg:gap-8">
          {blogTopics.map((t, i) => (
            <FadeUp key={t.index} delay={i * 0.12}>
              <TiltCard index={i}>
                <a
                  href={t.postUrl}
                  target="_blank"
                  rel="noreferrer"
                  data-cursor="view"
                  data-cursor-label="Read"
                  className="group block transition-transform duration-500 ease-out hover:-translate-y-2"
                >
                  <article className="flex h-full flex-col rounded-xl border border-[hsl(var(--line))] bg-[hsl(44_30%_97.5%)] p-7 shadow-[0_1px_2px_hsl(30_8%_9%/0.06)] transition-shadow duration-500 group-hover:shadow-[0_24px_48px_-16px_hsl(30_8%_9%/0.18)] lg:p-9">
                  <div className="mb-8 flex items-center justify-between gap-3">
                    <span className="flex min-w-0 items-center gap-2.5">
                      <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[hsl(var(--verde))]" />
                      <span className="label-caps">{t.title}</span>
                    </span>
                    <span className="label-caps shrink-0 text-[hsl(var(--verde))]">({t.index})</span>
                  </div>

                  <p className="flex-1 text-sm leading-relaxed text-[hsl(var(--ink-soft))]">{t.body}</p>

                  <div className="mt-10 border-t border-[hsl(var(--line))] pt-5">
                    <div className="label-caps mb-2">Start with</div>
                    <div className="flex items-start justify-between gap-4">
                      <span className="font-display text-lg font-light leading-snug transition-colors duration-300 group-hover:text-[hsl(var(--verde))]">
                        {t.postTitle}
                      </span>
                      <span className="mt-1 shrink-0 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5">
                        ↗
                      </span>
                    </div>
                  </div>
                </article>
              </a>
              </TiltCard>
            </FadeUp>
          ))}
        </div>

        <FadeUp delay={0.2} className="mt-16 flex justify-center">
          <Magnetic strength={0.25}>
            <a
              href={blogUrl}
              target="_blank"
              rel="noreferrer"
              data-cursor
              className="group inline-flex items-center gap-4 rounded-full border border-[hsl(var(--ink))] px-8 py-4 text-[12px] font-medium uppercase tracking-[0.2em] transition-colors duration-300 hover:bg-[hsl(var(--ink))] hover:text-[hsl(var(--paper))]"
            >
              Read the blog
              <span className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5">↗</span>
            </a>
          </Magnetic>
        </FadeUp>
      </div>
    </section>
  )
}
