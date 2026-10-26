// Checks the built site in dist/ before it goes live, so a broken build is never published.
// Run after `npm run build`. With REQUIRE_PHOTOS=true, every photo the site uses must be there too.
import { existsSync, readFileSync } from 'node:fs'
import { photos } from '../src/photos.js'
import { site } from '../src/siteConfig.js'

const problems = []
const pages = ['dist/index.html']

for (const page of pages) {
  if (!existsSync(page)) {
    problems.push(`${page} is missing`)
    continue
  }
  const html = readFileSync(page, 'utf8')
  if (html.includes('/src/main.jsx')) problems.push(`${page} still points at the source code instead of the built site`)
  const scripts = [...html.matchAll(/<script[^>]*\s(?:data-)?src="([^"]+)"/g)].map((m) => m[1])
  if (!scripts.some((s) => /\/assets\/index-[\w-]+\.js$/.test(s))) problems.push(`${page} has no built script`)
  for (const s of scripts.filter((s) => s.includes('/assets/'))) {
    if (!existsSync(`dist/assets/${s.split('/assets/')[1]}`)) problems.push(`${page} links ${s}, which isn't in the build`)
  }
}

if (process.env.REQUIRE_PHOTOS === 'true') {
  for (const p of [site.portrait, ...photos]) {
    if (p.src?.startsWith('/') && !existsSync(`dist${p.src}`)) problems.push(`photo ${p.src} is missing from the build`)
  }
}

if (problems.length) {
  for (const p of problems) console.error(`::error::${p}`)
  process.exit(1)
}
console.log(`Build looks good (${pages.length} page${pages.length > 1 ? 's' : ''} checked).`)
