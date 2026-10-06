import { useState } from 'react'
import { motion, useReducedMotion, useScroll, useSpring, useTransform, useVelocity } from 'framer-motion'
import { SectionHead, FadeUp } from '@/components/Reveal'
import { projects, type Project } from '@/data/content'
import { trackContact, trackProject } from '@/lib/analytics'

function ProjectVisual({ p, className }: { p: Project; className?: string }) {
  return (
    <div className={`relative overflow-hidden rounded-sm bg-gradient-to-br ${p.hue} ${className ?? ''}`}>
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.13]"
        style={{
          backgroundImage:
            'repeating-linear-gradient(115deg, transparent 0px, transparent 14px, rgba(255,255,255,0.7) 14px, rgba(255,255,255,0.7) 15px)',
        }}
      />
      <span className="absolute bottom-3 left-5 font-display text-[7rem] font-light leading-none text-white/90 md:text-[8.5rem]">
        {p.monogram}
      </span>
      <span className="absolute right-4 top-4 text-[12px] font-medium uppercase tracking-[0.2em] text-white/80">{p.year}</span>
    </div>
  )
}

function Row({ p, active, onEnter, onLeave }: { p: Project; active: boolean; onEnter: () => void; onLeave: () => void }) {
  const inner = (
    <div className="group py-7 md:py-9">
      <div className="grid grid-cols-[auto_1fr_auto] items-center gap-5 md:grid-cols-[64px_1fr_auto_40px] md:gap-8">
        <span className="label-caps text-[hsl(var(--verde))]">({p.index})</span>
        <div className="min-w-0">
          <motion.h3
            animate={{ x: active ? 14 : 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 26 }}
            className="font-display text-3xl font-light leading-[1.12] tracking-tight transition-colors duration-300 group-hover:text-[hsl(var(--verde))] group-focus-visible:text-[hsl(var(--verde))] md:text-5xl md:leading-[1.15]"
          >
            {p.title}
          </motion.h3>
          <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1">
            <span className="text-[13px] text-[hsl(var(--ink-soft))]">{p.client}</span>
            <span className="hidden h-px w-6 bg-[hsl(var(--line))] sm:inline-block" />
            <span className="label-caps hidden sm:inline">{p.tags.join(' · ')}</span>
          </div>
        </div>
        <span className="label-caps hidden md:inline">{p.year}</span>
        <motion.span
          animate={{ x: active ? 0 : -8, opacity: active ? 1 : 0.35, rotate: active ? 0 : -45 }}
          transition={{ duration: 0.35 }}
          className="hidden justify-self-end text-2xl md:block"
        >
          →
        </motion.span>
      </div>

      {/* the story and the outcome are the point: always visible, every device */}
      <div className="grid grid-cols-1 gap-4 pt-4 md:grid-cols-[64px_1fr_auto_40px] md:gap-8">
        <span className="hidden md:block" />
        <div className="max-w-2xl">
          <p className="text-sm leading-relaxed text-[hsl(var(--ink-soft))]">{p.description}</p>
          {p.impact && <p className="mt-2 text-[13px] font-medium text-[hsl(var(--verde))]">▸ {p.impact}</p>}
        </div>
        <span className="hidden md:block" />
        <span className="hidden md:block" />
      </div>
    </div>
  )

  const cls = 'block border-b border-[hsl(var(--line))]'
  if (p.link) {
    return (
      <a
        href={p.link}
        target="_blank"
        rel="noreferrer"
        data-cursor="view"
        data-cursor-label="Open"
        onClick={() => trackProject(p.id, p.title, 'open_link')}
        onMouseEnter={onEnter}
        onMouseLeave={onLeave}
        className={cls}
      >
        {inner}
      </a>
    )
  }
  // private work: clicking asks for access by email, subject prefilled per project
  const requestHref = `mailto:contact@gui-ux.com?subject=${encodeURIComponent(`Requesting more info about ${p.title}`)}`
  return (
    <a
      href={requestHref}
      data-cursor="view"
      data-cursor-label="On request"
      onClick={() => {
        trackProject(p.id, p.title, 'request_info')
        trackContact('work', 'email')
      }}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      className={cls}
    >
      {inner}
    </a>
  )
}

export default function Projects() {
  const [active, setActive] = useState<number | null>(null)
  const reducedMotion = useReducedMotion()

  // the list leans into the scroll: skew with velocity, spring back to rest
  const { scrollY } = useScroll()
  const velocity = useVelocity(scrollY)
  const skew = useSpring(useTransform(velocity, [-1600, 0, 1600], [1.4, 0, -1.4]), {
    stiffness: 140,
    damping: 26,
  })

  return (
    <section id="work" className="relative px-6 py-28 md:px-10 md:py-40">
      <div className="mx-auto max-w-[1400px]">
        <h2 className="sr-only">Selected work</h2>
        <SectionHead index="01" label="Selected work" />
        <FadeUp className="mb-10 max-w-xl">
          <p className="text-[15px] leading-relaxed text-[hsl(var(--ink-soft))]">
            Two decades of products and programs, from national fintech to airport hardware. The outcome line is the
            point. Where the work is public, the row opens it; where it isn't, you can request it.
          </p>
        </FadeUp>

        <motion.div style={reducedMotion ? undefined : { skewY: skew }} className="border-t border-[hsl(var(--line))]">
          {projects.map((p, i) => (
            <FadeUp key={p.id} delay={Math.min(i * 0.07, 0.35)} y={36}>
              <Row p={p} active={active === i} onEnter={() => setActive(i)} onLeave={() => setActive(null)} />
              {/* inline visual on touch / small screens */}
              <div className="border-b border-[hsl(var(--line))] pb-8 lg:hidden">
                <ProjectVisual p={p} className="aspect-[16/8] w-full" />
              </div>
            </FadeUp>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
