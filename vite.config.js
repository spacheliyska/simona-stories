import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import legacy, { cspHashes } from '@vitejs/plugin-legacy'
import { createHash } from 'node:crypto'
import { existsSync, readdirSync, readFileSync, rmSync } from 'node:fs'
import { fileURLToPath } from 'node:url'

// A short content hash per photo, e.g. { '/photos/01.jpg': '3f9a1c2b' }.
// The site requests 01.jpg?v=3f9a1c2b, so browsers can cache photos forever
// and still get the new file the moment a photo is replaced.
// (public/photos is my private photo repo; it may be missing, e.g. in pull request builds.)
const photosDir = new URL('./public/photos/', import.meta.url)
const photoVersions = Object.fromEntries(
  (existsSync(photosDir) ? readdirSync(photosDir) : [])
    .filter((f) => /\.(jpe?g|png|webp|avif)$/i.test(f))
    .map((f) => [`/photos/${f}`, createHash('sha256').update(readFileSync(new URL(f, photosDir))).digest('hex').slice(0, 8)])
)

// Content Security Policy for the built site: browsers only run scripts and load files
// that come from this site itself, so injected code has nowhere to run from.
// The hashes allow the few small inline scripts the legacy-browser loader needs.
// (Not used in `npm run dev`, where Vite's live reload needs inline scripts.)
const csp = [
  "default-src 'self'",
  `script-src 'self' ${cspHashes.map((h) => `'sha256-${h}'`).join(' ')}`,
  "style-src 'self'",
  "img-src 'self'",
  "font-src 'self'",
  "connect-src 'self'",
  "object-src 'none'",
  "frame-src 'none'",
  "base-uri 'none'",
  "form-action 'none'",
  'upgrade-insecure-requests',
].join('; ')

// Right after the viewport tag: before any script, after the charset.
const securityTags = {
  name: 'security-tags',
  apply: 'build',
  transformIndexHtml: (html) =>
    html.replace(
      /(<meta name="viewport"[^>]*>)/,
      `$1\n    <meta http-equiv="Content-Security-Policy" content="${csp}" />\n    <meta name="referrer" content="no-referrer" />`
    ),
}

// public/photos is a clone of my private photo repo: never publish its .git folder (its history).
const dropPhotoRepoHistory = {
  name: 'drop-photo-repo-history',
  apply: 'build',
  closeBundle: () => rmSync(new URL('./dist/photos/.git', import.meta.url), { recursive: true, force: true }),
}

export default defineConfig({
  define: {
    __PHOTO_VERSIONS__: JSON.stringify(photoVersions),
  },
  // The folder the site is served from. '/' locally and on a custom domain;
  // the GitHub Pages workflow sets BASE_PATH=/simona-stories/.
  base: process.env.BASE_PATH || '/',
  build: {
    // Never turn small files into inline data: URLs; the security policy only allows files from this site.
    assetsInlineLimit: 0,
    rollupOptions: {
      // Two pages with the same app: English at /, Bulgarian at /bg/.
      input: {
        main: fileURLToPath(new URL('./index.html', import.meta.url)),
        bg: fileURLToPath(new URL('./bg/index.html', import.meta.url)),
      },
    },
  },
  plugins: [
    react(),
    // Builds an extra, polyfilled version that older browsers load automatically.
    // Modern browsers keep getting the small, fast version.
    legacy({
      targets: ['defaults', 'Safari >= 12', 'iOS >= 12', 'Chrome >= 64', 'Firefox >= 67', 'Edge >= 79', 'Samsung >= 9', 'not IE 11'],
    }),
    securityTags,
    dropPhotoRepoHistory,
  ],
})
