import { motion } from 'framer-motion'
import Magnetic from '@/components/Magnetic'
import { FadeUp, MaskReveal, EASE } from '@/components/Reveal'
import { trackContact } from '@/lib/analytics'

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[hsl(var(--ink))] px-6 pb-10 pt-28 text-[hsl(var(--paper))] md:px-10 md:pt-40">
      <div className="mx-auto max-w-[1400px]">
        <FadeUp>
          <div className="label-caps mb-10 !text-[hsl(var(--paper)/0.6)]">(05) · Let's talk</div>
        </FadeUp>

        <a href="mailto:contact@gui-ux.com" data-cursor="view" data-cursor-label="Say hi" onClick={() => trackContact('footer_headline')} className="group block">
          <h2 className="font-display text-[10.5vw] font-light leading-[1.06] tracking-[-0.02em] sm:text-[8.5vw] md:leading-[0.95] lg:text-[8vw]">
            <MaskReveal>Have a vision?</MaskReveal>
            <MaskReveal delay={0.12}>
              <span className="md:inline-flex md:items-center md:gap-4">
                Let's make it
                <motion.span
                  className="ml-3 text-[hsl(var(--verde-bright))] md:ml-4"
                  whileHover={{ rotate: -4 }}
                  transition={{ duration: 0.4, ease: EASE }}
                >
                  real.
                </motion.span>
              </span>
            </MaskReveal>
          </h2>
        </a>

        <div className="mt-16 flex flex-col justify-between gap-10 border-t border-white/15 pt-10 md:mt-24 md:flex-row md:items-end">
          <div className="space-y-3">
            <div className="label-caps !text-[hsl(var(--paper)/0.65)]">Reach me</div>
            <Magnetic strength={0.25} className="inline-block">
              <a href="mailto:contact@gui-ux.com" data-cursor onClick={() => trackContact('footer')} className="link-sweep inline-block py-1.5 font-display text-2xl font-light md:text-3xl">
                contact@gui-ux.com
              </a>
            </Magnetic>
            <div className="text-sm text-[hsl(var(--paper)/0.65)]">+966 57 056 4746 · Riyadh, KSA</div>
          </div>

          <div className="flex gap-10">
            <div className="space-y-3">
              <div className="label-caps !text-[hsl(var(--paper)/0.65)]">Elsewhere</div>
              <div className="flex flex-col gap-2 text-sm">
                <a href="https://www.linkedin.com/in/uxguilherme/" target="_blank" rel="noreferrer" data-cursor className="link-sweep inline-block w-fit py-1.5">
                  LinkedIn ↗
                </a>
                <a href="https://www.toptal.com/designers/resume/guilherme-rodrigues#BQ45oY" target="_blank" rel="noreferrer" data-cursor className="link-sweep inline-block w-fit py-1.5">
                  Hire me on Toptal ↗
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* name marquee */}
        <div className="mt-20 overflow-hidden border-t border-white/15 pt-8">
          <div className="animate-marquee flex w-max whitespace-nowrap [--marquee-duration:28s]">
            {Array.from({ length: 6 }).map((_, i) => (
              <span key={i} className="mr-12 font-display text-6xl font-light text-[hsl(var(--paper)/0.14)] md:text-8xl">
                Guilherme Rodrigues · UX · AI · Transformation
              </span>
            ))}
          </div>
        </div>

        <div className="mt-8 flex items-center justify-between text-[12px] uppercase tracking-[0.2em] text-[hsl(var(--paper)/0.6)]">
          <span>© {new Date().getFullYear()} Guilherme Rodrigues</span>
          <span>Designed with intent</span>
        </div>
      </div>
    </footer>
  )
}
