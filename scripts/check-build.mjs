// Checks the built site in dist/ before it goes live, so a broken or unsafe build is never published.
// Run after `npm run build`. With REQUIRE_PHOTOS=true, every photo the site uses must be there too.
import { createHash } from 'node:crypto'
import { existsSync, readdirSync, readFileSync } from 'node:fs'
import { photos } from '../src/photos.js'
import { site } from '../src/siteConfig.js'

const problems = []
const pages = { 'dist/index.html': 'en', 'dist/bg/index.html': 'bg' }

for (const [page, lang] of Object.entries(pages)) {
  if (!existsSync(page)) {
    problems.push(`${page} is missing`)
    continue
  }
  const html = readFileSync(page, 'utf8')
  if (!html.includes(`<html lang="${lang}">`)) problems.push(`${page} should be in language "${lang}"`)
  if (html.includes('/src/main.jsx')) problems.push(`${page} still points at the source code instead of the built site`)

  const scripts = [...html.matchAll(/<script([^>]*)>([\s\S]*?)<\/script>/g)]
  const files = scripts.map((m) => m[1].match(/\s(?:data-)?src="([^"]+)"/)?.[1]).filter(Boolean)
  if (!files.some((s) => /\/assets\/[\w-]+\.js$/.test(s))) problems.push(`${page} has no built script`)
  for (const s of files.filter((s) => !s.startsWith('/') || s.startsWith('//'))) {
    problems.push(`${page} loads a script from outside the site (${s.slice(0, 40)}…), which the security policy blocks`)
  }
  for (const s of files.filter((s) => s.includes('/assets/'))) {
    if (!existsSync(`dist/assets/${s.split('/assets/')[1]}`)) problems.push(`${page} links ${s}, which isn't in the build`)
  }

  // The security policy must be there, and must allow every inline script, or browsers would block it.
  const csp = html.match(/<meta http-equiv="Content-Security-Policy" content="([^"]+)"/)?.[1]?.replaceAll('&#39;', "'")
  if (!csp) problems.push(`${page} has no Content-Security-Policy`)
  else if (html.indexOf('http-equiv="Content-Security-Policy"') > html.search(/<script(?![^>]*application\/ld\+json)/)) {
    problems.push(`${page} has a script before its security policy`)
  }
  for (const [, attrs, code] of scripts) {
    if (/\ssrc=|application\/ld\+json/.test(attrs) || !code.trim()) continue
    const hash = createHash('sha256').update(code).digest('base64')
    if (csp && !csp.includes(`'sha256-${hash}'`)) problems.push(`${page} has an inline script the security policy would block`)
  }
}

// A .git folder must never be published.
const published = readdirSync('dist', { recursive: true }).map(String)
if (published.some((p) => p.split(/[\\/]/).includes('.git'))) problems.push('dist contains a .git folder')

if (process.env.REQUIRE_PHOTOS === 'true') {
  for (const p of [site.portrait, ...photos]) {
    if (p.src?.startsWith('/') && !existsSync(`dist${p.src}`)) problems.push(`photo ${p.src} is missing from the build`)
  }
}

if (problems.length) {
  for (const p of problems) console.error(`::error::${p}`)
  process.exit(1)
}
console.log(`Build looks good: ${Object.keys(pages).length} pages, security policy in place.`)
