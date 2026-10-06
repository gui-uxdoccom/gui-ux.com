# Changelog

All notable changes to gui-ux.com are documented here.
The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and the project uses [Semantic Versioning](https://semver.org/).

## [2.0.0] - 2026-10-07

A full rebuild of the site on a new platform.

### Added
- New single-page site built with React 19, TypeScript, Vite and Tailwind CSS
- Sections: Hero, About, Experience, Projects, Blog and Footer
- Interactive 3D hero canvas (three.js), smooth scrolling (Lenis), scroll
  reveal animations, magnetic buttons and a custom cursor
- Motion respects the visitor's "reduce motion" setting
- Build-time prerender, so search engines, LLM agents and link previews get
  the full page HTML instead of an empty shell
- OpenGraph and Twitter cards with a social preview image (`og-card.png`)
- Structured data (JSON-LD) for search engines and LLMs
- PostHog analytics (EU host): page views, section views, scroll depth,
  outbound clicks and contact intent; skipped on localhost
- `CHANGELOG.md` and project versioning

### Changed
- Deploy workflow now installs, builds and prerenders the site, checks the
  output, and uploads only `dist/` to the FTP server
- Source code lives in `src/`; static files (`robots.txt`, `sitemap.xml`,
  `llms.txt`, Google Search Console verification) live in `public/`
- Contact is by `mailto:contact@gui-ux.com` links

### Removed
- Legacy static site: old `index.html`, `portfolio.html`, SuperBox plugin
  and its images
- Legacy prototypes: camelride, edirham-app and fly01
- Server-side email sending (`sendemail`)

## [1.0.0] - 2026-02-05

The original static site, uploaded as-is to the FTP server.

### Added
- Static HTML site with portfolio page and prototypes
- `robots.txt`, `llms.txt` and `sitemap.xml` for SEO
- `sendemail` contact form
- GitHub Actions FTP deploy on push to `main`

[2.0.0]: https://github.com/gui-uxdoccom/gui-ux.com/compare/v1.0.0...v2.0.0
[1.0.0]: https://github.com/gui-uxdoccom/gui-ux.com/releases/tag/v1.0.0
