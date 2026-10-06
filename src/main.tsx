import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import { MotionConfig } from 'framer-motion'
import './index.css'
import App from './App.tsx'
import { initAnalytics } from './lib/analytics'

const rootEl = document.getElementById('root')!
// the build can prerender static HTML into #root for crawlers and first paint;
// clear it before React mounts so nothing is duplicated
if (rootEl.hasChildNodes()) rootEl.innerHTML = ''

createRoot(rootEl).render(
  <StrictMode>
    <MotionConfig reducedMotion="user">
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </MotionConfig>
  </StrictMode>,
)

initAnalytics()
