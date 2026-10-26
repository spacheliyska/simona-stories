import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import legacy from '@vitejs/plugin-legacy'
import { createHash } from 'node:crypto'
import { readdirSync, readFileSync } from 'node:fs'

// A short content hash per photo, e.g. { '/photos/01.jpg': '3f9a1c2b' }.
// The site requests 01.jpg?v=3f9a1c2b, so browsers can cache photos forever
// and still get the new file the moment a photo is replaced.
const photosDir = new URL('./public/photos/', import.meta.url)
const photoVersions = Object.fromEntries(
  readdirSync(photosDir)
    .filter((f) => /\.(jpe?g|png|webp|avif)$/i.test(f))
    .map((f) => [`/photos/${f}`, createHash('sha256').update(readFileSync(new URL(f, photosDir))).digest('hex').slice(0, 8)])
)

export default defineConfig({
  define: {
    __PHOTO_VERSIONS__: JSON.stringify(photoVersions),
  },
  // The folder the site is served from. '/' locally and on a custom domain;
  // the GitHub Pages workflow sets BASE_PATH=/simona-stories/.
  base: process.env.BASE_PATH || '/',
  plugins: [
    react(),
    // Builds an extra, polyfilled version that older browsers load automatically.
    // Modern browsers keep getting the small, fast version.
    legacy({
      targets: ['defaults', 'Safari >= 12', 'iOS >= 12', 'Chrome >= 64', 'Firefox >= 67', 'Edge >= 79', 'Samsung >= 9', 'not IE 11'],
    }),
  ],
})
