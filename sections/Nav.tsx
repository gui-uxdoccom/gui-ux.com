import { useEffect, useState } from 'react'
import { motion, useScroll, useSpring, AnimatePresence } from 'framer-motion'
import Magnetic from '@/components/Magnetic'
import { EASE } from '@/components/Reveal'
import { trackContact } from '@/lib/analytics'

const links = [
  { label: 'Work', href: '#work' },
  { label: 'Experience', href: '#experience' },
  { label: 'Stories', href: '#stories' },
  { label: 'About', href: '#about' },
]

export default function Nav() {
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 26 })
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // lock body scroll while the panel is open
  useEffect(() => {
    document.documentElement.style.overflow = open ? 'hidden' : ''
    return () => {
      document.documentElement.style.overflow = ''
    }
  }, [open])

  const go = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    setOpen(false)
    // keep the URL hash honest for shareable section links
    window.history.replaceState(null, '', href)
    // wait for the panel to lift before scrolling to the section
    setTimeout(() => document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' }), 350)
  }

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, delay: 0.4, ease: EASE }}
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter,color] duration-700 ${
          open
            ? 'border-b border-transparent bg-transparent'
            : scrolled
              ? 'border-b border-[hsl(var(--line))] bg-[hsl(var(--paper)/0.82)] backdrop-blur-md'
              : 'border-b border-transparent'
        }`}
      >
        <nav className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-4 md:px-10">
          <button
            onClick={() => (open ? setOpen(false) : window.scrollTo({ top: 0, behavior: 'smooth' }))}
            data-cursor
            className={`group flex items-baseline gap-2 transition-colors duration-500 ${open ? 'text-[hsl(var(--paper))]' : ''}`}
          >
            <span className="font-display text-xl font-medium tracking-tight">
              GUI<span className={open ? 'text-[hsl(var(--verde-bright))]' : 'text-[hsl(var(--verde))]'}>UX</span>
            </span>
            <span
              className={`label-caps hidden opacity-0 transition-opacity duration-300 group-hover:opacity-100 sm:inline ${
                open ? '!text-[hsl(var(--paper)/0.6)]' : ''
              }`}
            >
              {open ? 'close' : 'top'}
            </span>
          </button>

          <div className="hidden items-center gap-5 md:flex lg:gap-8">
            {links.map((l) => (
              <a key={l.href} href={l.href} onClick={(e) => go(e, l.href)} data-cursor className="link-sweep label-caps py-2 hover:text-[hsl(var(--ink))]">
                {l.label}
              </a>
            ))}
            <Magnetic strength={0.3}>
              <a
                href="mailto:contact@gui-ux.com"
                data-cursor
                onClick={() => trackContact('nav')}
                className="whitespace-nowrap rounded-full border border-[hsl(var(--ink))] px-5 py-2.5 text-[13px] font-medium uppercase tracking-[0.18em] transition-colors duration-300 hover:bg-[hsl(var(--ink))] hover:text-[hsl(var(--paper))]"
              >
                Let's talk
              </a>
            </Magnetic>
          </div>

          {/* mobile trigger: Menu / Close with animated icon */}
          <button
            onClick={() => setOpen(!open)}
            data-cursor
            aria-expanded={open}
            aria-label={open ? 'Close menu' : 'Open menu'}
            className={`flex min-h-[44px] items-center gap-3 px-1 md:hidden ${open ? 'text-[hsl(var(--paper))]' : ''}`}
          >
            <span className="label-caps !text-current">{open ? 'Close' : 'Menu'}</span>
            <span className="relative block h-3.5 w-6">
              <motion.span
                animate={open ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.4, ease: EASE }}
                className={`absolute left-0 top-0 block h-[2px] w-6 origin-center ${open ? 'bg-[hsl(var(--paper))]' : 'bg-[hsl(var(--ink))]'}`}
              />
              <motion.span
                animate={open ? { opacity: 0, x: -8 } : { opacity: 1, x: 0 }}
                transition={{ duration: 0.3, ease: EASE }}
                className={`absolute left-0 top-[6px] block h-[2px] w-4 ${open ? 'bg-[hsl(var(--paper))]' : 'bg-[hsl(var(--ink))]'}`}
              />
              <motion.span
                animate={open ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.4, ease: EASE }}
                className={`absolute bottom-0 left-0 block h-[2px] w-6 origin-center ${open ? 'bg-[hsl(var(--paper))]' : 'bg-[hsl(var(--ink))]'}`}
              />
            </span>
          </button>
        </nav>
        {!open && <motion.div className="h-px origin-left bg-[hsl(var(--verde))]" style={{ scaleX: progress }} />}
      </motion.header>

      {/* dark full-screen panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.55, ease: EASE }}
            className="fixed inset-0 z-40 flex flex-col justify-between bg-[hsl(var(--ink))] px-8 pb-10 pt-28 text-[hsl(var(--paper))] md:hidden"
          >
            <div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.3, duration: 0.4 }}
                className="label-caps mb-6 !text-[hsl(var(--verde-bright))]"
              >
                Where to?
              </motion.div>
              {links.map((l, i) => (
                <motion.div
                  key={l.href}
                  initial={{ opacity: 0, y: 28 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16, transition: { duration: 0.22, delay: 0.04 * (links.length - i) } }}
                  transition={{ delay: 0.12 + 0.07 * i, duration: 0.5, ease: EASE }}
                >
                  <a
                    href={l.href}
                    onClick={(e) => go(e, l.href)}
                    className="group flex w-full items-baseline justify-between border-b border-white/15 py-5 text-left"
                  >
                    <span className="font-display text-4xl font-light transition-colors duration-300 group-hover:text-[hsl(var(--verde-bright))]">
                      {l.label}
                    </span>
                    <span className="label-caps !text-[hsl(var(--paper)/0.5)]">(0{i + 1})</span>
                  </a>
                </motion.div>
              ))}

              {/* a contact action inside the menu, not 12,000px away */}
              <motion.div
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, transition: { duration: 0.15 } }}
                transition={{ delay: 0.12 + 0.07 * links.length, duration: 0.5, ease: EASE }}
              >
                <a
                  href="mailto:contact@gui-ux.com"
                  onClick={() => trackContact('mobile_menu')}
                  className="mt-8 flex w-full items-center justify-center rounded-full bg-[hsl(var(--verde-bright))] px-6 py-4 text-[13px] font-medium uppercase tracking-[0.18em] text-[hsl(var(--ink))]"
                >
                  Let's talk
                </a>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, transition: { duration: 0.15 } }}
              transition={{ delay: 0.5, duration: 0.5, ease: EASE }}
              className="flex items-end justify-between"
            >
              <div>
                <div className="label-caps mb-2 !text-[hsl(var(--paper)/0.5)]">Reach me</div>
                <a href="mailto:contact@gui-ux.com" onClick={() => trackContact('mobile_menu')} className="inline-block py-1.5 font-display text-xl font-light text-[hsl(var(--verde-bright))]">
                  contact@gui-ux.com
                </a>
              </div>
              <a
                href="https://www.linkedin.com/in/uxguilherme/"
                target="_blank"
                rel="noreferrer"
                className="label-caps !text-[hsl(var(--paper)/0.6)]"
              >
                LinkedIn ↗
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
