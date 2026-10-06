import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FadeUp } from '@/components/Reveal'
import { experience } from '@/data/content'
import { EASE } from '@/components/Reveal'

function ExperienceRow({ i, open, onToggle }: { i: number; open: boolean; onToggle: () => void }) {
  const r = experience[i]
  return (
    <FadeUp delay={Math.min(i * 0.05, 0.3)}>
      <div className="border-b border-white/15">
        <button onClick={onToggle} data-cursor className="group grid w-full grid-cols-[auto_1fr_auto] items-baseline gap-4 py-6 text-left md:grid-cols-[48px_minmax(0,1.2fr)_minmax(0,1.5fr)_auto_24px] md:gap-6 md:py-7 lg:grid-cols-[56px_minmax(0,1.1fr)_minmax(0,1.6fr)_auto_32px] lg:gap-8">
          <span className="label-caps text-[hsl(var(--verde-bright))]">({r.index})</span>
          <span className="min-w-0">
            <span className="block truncate font-display text-xl font-light leading-[1.15] transition-colors duration-300 group-hover:text-[hsl(var(--verde-bright))] md:text-2xl">
              {r.company}
            </span>
            <span className="label-caps mt-1 block">{r.location}</span>
          </span>
          <span className="hidden truncate text-sm text-[hsl(var(--paper)/0.6)] md:block">{r.title}</span>
          <span className="text-right">
            <span className="block whitespace-nowrap text-[13px]">{r.period}</span>
            <span className="label-caps mt-1 flex items-center justify-end gap-2">
              {r.current && <span className="pulse-dot inline-block h-1.5 w-1.5 rounded-full bg-[hsl(var(--verde))]" />}
              {r.duration}
            </span>
          </span>
          <motion.span animate={{ rotate: open ? 45 : 0 }} transition={{ duration: 0.35, ease: EASE }} className="hidden justify-self-end text-xl font-light md:block">
            +
          </motion.span>
        </button>

        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.5, ease: EASE }}
              className="overflow-hidden"
            >
              <div className="grid gap-4 pb-8 md:grid-cols-[48px_1fr] md:gap-6 lg:grid-cols-[56px_1fr] lg:gap-8">
                <span className="hidden md:block" />
                <div className="max-w-3xl">
                  <p className="mb-2 font-display text-lg font-light text-[hsl(var(--verde-bright))] md:hidden">{r.title}</p>
                  <p className="text-[15px] leading-relaxed text-[hsl(var(--paper)/0.68)]">{r.description}</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </FadeUp>
  )
}

export default function Experience() {
  const [open, setOpen] = useState<number | null>(0)
  return (
    <section
      id="experience"
      className="bg-[hsl(var(--ink))] px-6 py-28 text-[hsl(var(--paper))] md:px-10 md:py-40 [&_.label-caps]:text-[hsl(var(--paper)/0.65)] [&_button:hover_.label-caps]:text-[hsl(var(--paper)/0.75)]"
    >
      <div className="mx-auto max-w-[1400px]">
        <div className="mb-14 md:mb-20">
          <FadeUp>
            <div className="flex items-baseline gap-4">
              <span className="label-caps text-[hsl(var(--verde-bright))]">(02)</span>
              <span className="label-caps !text-[hsl(var(--paper)/0.65)]">Experience · 2006 to today</span>
            </div>
          </FadeUp>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.1, ease: EASE }}
            className="mt-5 h-px w-full origin-left bg-white/15"
          />
        </div>

        <FadeUp className="mb-12 max-w-2xl">
          <h2 className="font-display text-4xl font-light leading-[1.15] md:text-6xl">
            From Porto Alegre to <span className="text-[hsl(var(--verde-bright))]">Riyadh</span>. Eight chapters, one
            thread: making technology feel human.
          </h2>
        </FadeUp>

        <div className="border-t border-white/15 [&_.hairline]:bg-white/15">
          {experience.map((_, i) => (
            <ExperienceRow key={i} i={i} open={open === i} onToggle={() => setOpen(open === i ? null : i)} />
          ))}
        </div>
      </div>
    </section>
  )
}
