/**
 * Post-build prerender: renders the built SPA in headless Chrome and bakes
 * the resulting markup into dist/index.html.
 *
 * Why: crawlers, LLM agents and link unfurlers don't run JavaScript. Without
 * this step the site serves them an empty <div id="root">. With it, they get
 * the full page content, and human visitors get a first paint before the
 * bundle boots.
 *
 * Run with: npm run build:seo   (or: npm run build && npm run prerender)
 */
import { createServer } from 'node:http'
import { readFile, writeFile } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import { extname, join, resolve } from 'node:path'
import puppeteer from 'puppeteer'

const DIST = resolve('dist')
const PORT = 4517

const MIME = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.txt': 'text/plain',
  '.xml': 'application/xml',
}

function serve() {
  const server = createServer(async (req, res) => {
    const path = join(DIST, req.url === '/' ? 'index.html' : decodeURIComponent(req.url.split('?')[0]))
    if (!existsSync(path)) {
      res.writeHead(404).end('not found')
      return
    }
    res.writeHead(200, { 'content-type': MIME[extname(path)] ?? 'application/octet-stream' })
    res.end(await readFile(path))
  })
  return new Promise((r) => server.listen(PORT, () => r(server)))
}

const server = await serve()
const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] })

try {
  const page = await browser.newPage()
  await page.setViewport({ width: 1440, height: 900 })

  // external services (fonts, tag manager) are irrelevant to the content
  // snapshot and can hang headless runs; cut them off deterministically
  await page.setRequestInterception(true)
  page.on('request', (req) => {
    const url = req.url()
    if (url.includes('fonts.googleapis.com') || url.includes('fonts.gstatic.com') || url.includes('googletagmanager.com')) {
      req.abort()
    } else {
      req.continue()
    }
  })

  await page.goto(`http://127.0.0.1:${PORT}/`, { waitUntil: 'domcontentloaded', timeout: 60000 })
  await page.waitForSelector('#root section', { timeout: 30000 })

  // let the entrance animations settle, then walk the page so every
  // scroll-triggered reveal fires (they stay visible once shown)
  await new Promise((r) => setTimeout(r, 3500))
  await page.evaluate(async () => {
    const step = window.innerHeight * 0.6
    for (let y = 0; y <= document.documentElement.scrollHeight; y += step) {
      window.scrollTo(0, y)
      await new Promise((r) => setTimeout(r, 250))
    }
    window.scrollTo(0, 0)
  })
  await new Promise((r) => setTimeout(r, 1200))

  const content = await page.evaluate(() => document.getElementById('root')?.innerHTML ?? '')
  if (content.length < 5000) {
    throw new Error(`prerender captured suspiciously little content (${content.length} chars), aborting`)
  }

  const indexPath = join(DIST, 'index.html')
  const html = await readFile(indexPath, 'utf8')
  if (!html.includes('<div id="root"></div>')) {
    throw new Error('dist/index.html has no empty #root to fill — was it already prerendered?')
  }
  await writeFile(indexPath, html.replace('<div id="root"></div>', `<div id="root">${content}</div>`))
  console.log(`✓ prerendered ${(content.length / 1024).toFixed(0)} KB of markup into dist/index.html`)
} finally {
  await browser.close()
  server.close()
}
