// Service worker: caches the site in the visitor's browser.
// GitHub Pages sends every file with a fixed 10-minute cache, so this is what
// makes repeat visits instant and lets the site open offline.
//
// Nothing stale after a deploy:
// - Pages (HTML): always checked with the server (bypassing GitHub's 10-minute
//   cache), so a new deploy shows up right away; cached copy only when offline.
// - /assets/ (JS, CSS, fonts): cache first. Vite puts a content hash in these
//   filenames, so a new deploy means new names, never a changed file.
// - Photos: cache first. The site asks for them as 01.jpg?v=<content hash>
//   (see vite.config.js), so a replaced photo gets a new URL too.

const PAGES = 'pages-v1'
const ASSETS = 'assets-v1'
const PHOTOS = 'photos-v1'
const KEEP = [PAGES, ASSETS, PHOTOS]
// Old versions pile up after each deploy; keep only the newest ones.
const MAX_ASSETS = 80
const MAX_PHOTOS = 40

const scope = new URL(self.registration.scope).pathname

self.addEventListener('install', () => self.skipWaiting())

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((names) => Promise.all(names.filter((n) => !KEEP.includes(n)).map((n) => caches.delete(n))))
      .then(() => self.clients.claim())
  )
})

self.addEventListener('fetch', (event) => {
  const { request } = event
  if (request.method !== 'GET') return
  const url = new URL(request.url)
  if (url.origin !== self.location.origin) return

  if (request.mode === 'navigate') {
    event.respondWith(networkFirst(request))
  } else if (url.pathname.startsWith(scope + 'assets/')) {
    event.respondWith(cacheFirst(request, ASSETS, MAX_ASSETS))
  } else if (url.pathname.startsWith(scope + 'photos/') && url.searchParams.has('v')) {
    event.respondWith(cacheFirst(request, PHOTOS, MAX_PHOTOS))
  }
})

async function networkFirst(request) {
  const cache = await caches.open(PAGES)
  try {
    // 'no-cache' revalidates with the server (a cheap 304 when nothing changed).
    const response = await fetch(request, { cache: 'no-cache' })
    if (response.ok) cache.put(request, response.clone())
    return response
  } catch {
    return (await cache.match(request)) || (await cache.match(scope)) || Response.error()
  }
}

async function cacheFirst(request, name, max) {
  const cache = await caches.open(name)
  const cached = await cache.match(request)
  if (cached) return cached
  const response = await fetch(request)
  if (response.ok) {
    await cache.put(request, response.clone())
    trim(cache, max)
  }
  return response
}

async function trim(cache, max) {
  const keys = await cache.keys()
  // Cache keys come back oldest first.
  await Promise.all(keys.slice(0, Math.max(0, keys.length - max)).map((k) => cache.delete(k)))
}
