# simona-stories

This is my portfolio website. I'm **Simona Pacheliyska**, a street and portrait photographer based in Sofia and Smolyan, Bulgaria.
I wanted the site to feel like a box of old prints: film grain, light leaks, a film strip, a contact sheet and hand-marked favourites,
while the photos themselves stay sharp and true to colour.

**Live site:** https://spacheliyska.github.io/simona-stories/

I built it with React 19 and Vite 7, and it deploys itself to GitHub Pages with GitHub Actions every time I push.

---

## Running it locally

1. Install [Node.js](https://nodejs.org) (LTS).
2. In this folder:
   ```
   npm install
   npm run dev
   ```
3. Open the address it prints (usually http://localhost:5173). The page reloads on its own when I save a file.

To check the final version exactly as it will be published (including the build for older browsers):

```
npm run build
npm run preview
```

> **Note to self (Windows):** if `npm` or `git` "is not recognized", close VS Code completely and open it again.
> If it says "running scripts is disabled", use `npm.cmd` instead of `npm`.

## Where everything lives

| What | Where |
| --- | --- |
| My name, slogan, location, About text, email, Instagram | `src/siteConfig.js` |
| Gallery photos (title, place, year, description, favourites, focus point) | `src/photos.js` |
| Photo files | `public/photos/` (`01.jpg`, `02.jpg`, … and `me.jpg`, my portrait) |
| Google title, description and keywords | `index.html` |
| Colours, fonts, layout | `src/styles.css` |

How I add a photo:
- Export it at about 2000px on the long side, JPG quality ~80, so the site stays fast. Full-size originals go in
  `originals/`, which is kept out of git.
- Put it in `public/photos/` and add a line for it in `src/photos.js`. The order there is the order on the site.
- `alt` describes the photo in one sentence for people using screen readers.
- `place` and `year` are optional: left as `''`, they simply don't show.
- `focus` is the point that has to survive cropping (usually the eyes), as `'x% y%'` from the top-left.
- `pick: true` circles a favourite in red grease pencil on the contact sheet.

My portrait (`me.jpg`) is the big photo on the front page and also appears in the About section.

## Caching

GitHub Pages doesn't let me set cache headers (every file gets a fixed 10 minutes), so the site uses a small
service worker (`public/sw.js`) to cache in the visitor's browser:

- **Pages** are always checked with the server, so a new deploy shows up immediately. The cached copy is only used offline.
- **JS, CSS and fonts** have a content hash in their filenames, so they are cached for good.
- **Photos** are requested as `01.jpg?v=<content hash>` (worked out at build time in `vite.config.js`), so they are
  cached for good too, and a replaced photo gets a new address straight away.

The service worker only runs on the built site, never in `npm run dev`.

## Deployment

The workflow in `.github/workflows/deploy.yml` runs on GitHub Actions:

- **Every push to `main`:** builds the site and publishes it to GitHub Pages (takes ~1–2 minutes).
- **Every pull request:** builds the site to check nothing is broken, without publishing.
- **Manually:** *Actions* tab → *Build and deploy* → *Run workflow*.

**Setup that has to stay this way:** **Settings** → **Pages** → *Build and deployment* → **Source** must be
**GitHub Actions**, not "Deploy from a branch". With the branch option, GitHub publishes the raw source files
over the built site and the page comes up blank.

Progress and errors are in the repository's **Actions** tab.

### If I move to my own domain

1. Buy a domain (e.g. `simonapacheliyska.com`) and add it under **Settings → Pages → Custom domain**.
2. In `.github/workflows/deploy.yml`, change `BASE_PATH` to `/`.
3. Replace `https://spacheliyska.github.io/simona-stories/` with the domain in `index.html`,
   `public/robots.txt` and `public/sitemap.xml`.

## Getting found on Google

1. Add the site in [Google Search Console](https://search.google.com/search-console),
   submit `sitemap.xml` and click **Request indexing**.
2. Link the site from my Instagram bio and other profiles. Links pointing to the site
   help Google connect my name to it.

## Rights and privacy

- **Copyright:** all photos and texts are mine. The site footer states (in English and Bulgarian) that copying or
  using them without my written permission is prohibited, and `LICENSE` reserves all rights for this repository.
- **People in my photos:** where someone is clearly recognisable, I make sure I have their consent.
- **Fonts** (Fraunces, Atkinson Hyperlegible, IBM Plex Mono, Caveat) are under the SIL Open Font License and
  bundled with the site, so no visitor data is sent to Google Fonts (GDPR).
- **No cookies or analytics**, so no cookie banner is needed. If I ever add analytics, I need to add a consent banner.

## Accessibility and browser support

- Keyboard navigation, skip link, visible focus, screen-reader labels and an accessible photo viewer.
- Respects "reduce motion" and Windows High Contrast settings.
- Works in current Chrome, Edge, Firefox, Safari and Samsung Internet, and in older versions back to
  Safari/iOS 12, Chrome 64 and Firefox 67 through an automatic legacy build. Internet Explorer is not supported.

## Project structure

```
.github/workflows/deploy.yml   CI/CD: build + publish to GitHub Pages
index.html                     Page shell + Google/SEO information
vite.config.js                 Build settings + photo content hashes
public/                        Files served as-is (photos, service worker, favicon, robots.txt, sitemap.xml)
src/
  main.jsx                     Entry point, fonts, service worker registration
  App.jsx                      Page layout and sections
  siteConfig.js                My details and About text
  photos.js                    Gallery photo list
  styles.css                   All styling
  useReveal.js                 Fade-in on scroll
  components/
    Frame.jsx                  A single photo (cropping, loading, caching URL)
    FilmStrip.jsx              Scrollable 35mm film strip
    Lightbox.jsx               Full-screen photo viewer
    Decor.jsx                  Rotating stamp, word band, grease-pencil circle
```
