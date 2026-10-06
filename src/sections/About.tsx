import { SectionHead, FadeUp, MaskReveal } from '@/components/Reveal'
import { education, languages, skillGroups } from '@/data/content'

export default function About() {
  return (
    <section id="about" className="border-t border-[hsl(var(--line))] bg-[hsl(var(--paper-deep))] px-6 py-28 md:px-10 md:py-40">
      <div className="mx-auto max-w-[1400px]">
        <SectionHead index="04" label="About" />

        <div className="grid gap-16 lg:grid-cols-[1.2fr_1fr] lg:gap-24">
          <div>
            <h2 className="font-display text-3xl font-light leading-[1.3] md:text-[2.6rem]">
              <MaskReveal>Son, dad, husband. And a designer</MaskReveal>
              <MaskReveal delay={0.1}>
                drawn to things that come with <span className="text-[hsl(var(--verde))]">“you can't.”</span>
              </MaskReveal>
            </h2>
            <FadeUp delay={0.2} className="mt-8 max-w-xl space-y-5 text-[15px] leading-relaxed text-[hsl(var(--ink-soft))]">
              <p>
                From UX design to strategic digital transformation, what I really do is bring people together. My job
                is bridging cutting-edge technology and human-centred design, so businesses grow through real customer
                insight.
              </p>
              <p>
                I've watched the digital revolution first-hand for over 20 years, from legacy systems to today's
                AI-driven world. If I have a superpower, it's this: translating complex technology into seamless
                experiences that drive results. Turning ambitious visions into market-ready MVPs with immediate ROI.
              </p>
              <p>
                Off the clock, I'm probably riding the Globe of Death, restoring a classic car, or chasing the perfect
                cup of coffee.
              </p>
            </FadeUp>

            <FadeUp delay={0.3} className="mt-10">
              <div className="label-caps mb-4">Languages</div>
              <div className="flex flex-wrap gap-2">
                {languages.map((l) => (
                  <span key={l} data-cursor className="rounded-full border border-[hsl(var(--ink)/0.25)] px-4 py-1.5 text-[13px] transition-colors duration-300 hover:border-[hsl(var(--verde))] hover:bg-[hsl(var(--verde))] hover:text-[hsl(var(--paper))]">
                    {l}
                  </span>
                ))}
              </div>
            </FadeUp>
          </div>

          <div className="space-y-14">
            <FadeUp>
              <div className="label-caps mb-5">Capabilities</div>
              <div className="space-y-6">
                {skillGroups.map((g) => (
                  <div key={g.label} className="grid grid-cols-[92px_1fr] gap-4 border-b border-[hsl(var(--line))] pb-5">
                    <span className="label-caps pt-1 text-[hsl(var(--verde))]">{g.label}</span>
                    <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2">
                      {g.items.map((it) => (
                        <span key={it} className="whitespace-nowrap text-sm leading-[1.4]">{it}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </FadeUp>

            <FadeUp delay={0.1}>
              <div className="label-caps mb-5">Education & executive learning</div>
              <div className="space-y-0">
                {education.map((e) => (
                  <div key={e.title} data-cursor className="group grid grid-cols-[52px_1fr] gap-4 border-b border-[hsl(var(--line))] py-3.5 transition-colors">
                    <span className="label-caps pt-0.5">{e.year}</span>
                    <div>
                      <div className="text-sm font-medium transition-transform duration-300 group-hover:translate-x-1">{e.title}</div>
                      <div className="label-caps mt-0.5">{e.school}</div>
                    </div>
                  </div>
                ))}
              </div>
            </FadeUp>
          </div>
        </div>
      </div>
    </section>
  )
}
