/**
 * PostHog analytics, loaded directly (not via GTM) so GTM's measurement
 * host can't pollute the project. The library itself is dynamically imported
 * after first paint, keeping it out of the initial bundle. Dev and prerender
 * runs never init, keeping the data clean.
 */

import type { PostHog } from 'posthog-js'

const POSTHOG_KEY = 'phc_fmaoiyYDllZDrt4C1id3griP0PJBqxILwzSHhiWjqwi'
const POSTHOG_HOST = 'https://eu.i.posthog.com'

let client: PostHog | null = null
let initialised = false
const queue: Array<[string, Record<string, unknown> | undefined]> = []

function isRealVisitor() {
  const h = window.location.hostname
  return h !== 'localhost' && h !== '127.0.0.1' && !h.endsWith('.local')
}

export function initAnalytics() {
  if (!isRealVisitor() || initialised) return
  initialised = true
  trackSections()
  trackScrollDepth()
  trackOutboundClicks()
  // load the SDK off the critical path
  const boot = () =>
    import('posthog-js').then(({ default: posthog }) => {
      posthog.init(POSTHOG_KEY, {
        api_host: POSTHOG_HOST,
        capture_pageview: true,
        capture_pageleave: true,
        autocapture: true,
        person_profiles: 'identified_only',
      })
      client = posthog
      for (const [event, props] of queue) client.capture(event, props)
      queue.length = 0
    })
  if ('requestIdleCallback' in window) {
    (window as Window).requestIdleCallback(boot, { timeout: 4000 })
  } else {
    setTimeout(boot, 1500)
  }
}

export function track(event: string, props?: Record<string, unknown>) {
  if (!initialised) return
  try {
    if (client) client.capture(event, props)
    else queue.push([event, props])
  } catch {
    /* analytics must never break the site */
  }
}

/** The metric that matters: someone tried to start a conversation. */
export function trackContact(location: string, method: 'email' | 'form' | 'booking' = 'email') {
  track('contact_intent', { location, method })
}

/** Interaction with a project row: opening a public link or requesting access. */
export function trackProject(projectId: string, projectTitle: string, action: 'open_link' | 'request_info') {
  track('project_engaged', { project_id: projectId, project_title: projectTitle, action })
}

/** Each section, once per session, when it actually enters the viewport. */
function trackSections() {
  const seen = new Set<string>()
  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        const id = (e.target as HTMLElement).id || e.target.tagName.toLowerCase()
        if (e.isIntersecting && !seen.has(id)) {
          seen.add(id)
          track('section_viewed', { section: id })
        }
      }
    },
    { threshold: 0.25 },
  )
  document.querySelectorAll('main section[id], footer').forEach((el) => io.observe(el))
}

/** 25/50/75/100% milestones, once each per page load. */
function trackScrollDepth() {
  const marks = [25, 50, 75, 100]
  const hit = new Set<number>()
  const onScroll = () => {
    const max = document.documentElement.scrollHeight - window.innerHeight
    if (max <= 0) return
    const pct = Math.round((window.scrollY / max) * 100)
    for (const m of marks) {
      if (pct >= m && !hit.has(m)) {
        hit.add(m)
        track('scroll_depth', { depth: m })
      }
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true })
}

/** Any link that leaves the domain (blog, LinkedIn, client sites, PDFs). */
function trackOutboundClicks() {
  document.addEventListener('click', (e) => {
    const a = (e.target as HTMLElement).closest('a[href]') as HTMLAnchorElement | null
    if (!a) return
    const href = a.getAttribute('href') ?? ''
    if (href.startsWith('mailto:')) return // contact_intent covers these
    try {
      const url = new URL(a.href)
      if (url.hostname !== window.location.hostname) {
        track('outbound_click', { url: url.href, host: url.hostname })
      }
    } catch {
      /* ignore malformed hrefs */
    }
  })
}
