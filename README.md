# simona-stories

Portfolio website of **Simona Pacheliyska**, a street and portrait photographer based in Sofia and Smolyan, Bulgaria.
It has a warm, nostalgic film look: grain, light leaks, a film strip, a contact sheet and hand-marked prints.

**Live site:** https://spacheliyska.github.io/simona-stories/

Built with React 19 and Vite 7. Deployed automatically to GitHub Pages with GitHub Actions.

---

## Run it on your computer

1. Install [Node.js](https://nodejs.org) (LTS).
2. In this folder:
   ```
   npm install
   npm run dev
   ```
3. Open the address it prints (usually http://localhost:5173). The page reloads by itself when you save a file.

To check the final version exactly as it will be published (including the version for older browsers):

```
npm run build
npm run preview
```

> **Windows tip:** if `npm` or `git` "is not recognized", close VS Code completely and open it again.
> If you see "running scripts is disabled", use `npm.cmd` instead of `npm`.

## Edit the content

| What | Where |
| --- | --- |
| Name, slogan, location, About text, email, Instagram | `src/siteConfig.js` |
| Photos (title, place, year, description, favourites) | `src/photos.js` |
| Photo files | `public/photos/` (`01.jpg`, `02.jpg`, … and `me.jpg` for the About section) |
| Google title, description and keywords | `index.html` |
| Colours, fonts, layout | `src/styles.css` |

Photo tips:
- `01` is the large "developing" print on the front page.
- Add `alt: '...'` to describe each photo in one sentence for blind visitors using screen readers.
- Add `pick: true` to circle a favourite in red grease pencil on the contact sheet.
- Export at about 2000px on the long side, JPG quality ~80, so the site stays fast.

## Deployment (CI/CD)

The workflow in `.github/workflows/deploy.yml` runs on GitHub Actions:

- **Every push to `main`:** builds the site and publishes it to GitHub Pages (takes ~1–2 minutes).
- **Every pull request:** builds the site to check nothing is broken, without publishing.
- **Manually:** *Actions* tab → *Build and deploy* → *Run workflow*.

**One-time setup:** on GitHub, open the repository → **Settings** → **Pages** → under *Build and deployment*,
set **Source** to **GitHub Actions**. After that, every `git push` updates the live site.

Progress and errors are shown in the repository's **Actions** tab.

### Using your own domain later

1. Buy a domain (e.g. `simonapacheliyska.com`) and add it under **Settings → Pages → Custom domain**.
2. In `.github/workflows/deploy.yml`, change `BASE_PATH` to `/`.
3. Replace `https://spacheliyska.github.io/simona-stories/` with your domain in `index.html`,
   `public/robots.txt` and `public/sitemap.xml`.

## Get found on Google

1. Add the site in [Google Search Console](https://search.google.com/search-console),
   submit `sitemap.xml` and click **Request indexing**.
2. Put the website link in your Instagram bio and other profiles. Links pointing to your site
   help Google connect your name to it.

## Before going public (legal checklist)

- [ ] Replace every mock photo in `src/photos.js`. They are placeholder stock photos from picsum.photos by other
      photographers and must not appear on the site as your work.
- [ ] Where a person is clearly recognisable, especially if the site promotes paid work,
      get their consent or choose another frame.
- [ ] Use only text you wrote yourself, or that you have the rights to.

Already handled:
- **Copyright:** the site footer states (in English and Bulgarian) that copying or using the photos and texts
  without written permission is prohibited, and `LICENSE` reserves all rights for this repository.
- Fonts (Fraunces, Atkinson Hyperlegible, IBM Plex Mono, Caveat) are under the SIL Open Font License and
  bundled with the site, so no visitor data is sent to Google Fonts (GDPR).
- No cookies or analytics, so no cookie banner is needed. If you add analytics later, add a consent banner.

## Accessibility and browser support

- Keyboard navigation, skip link, visible focus, screen-reader labels, accessible photo viewer.
- Respects "reduce motion" and Windows High Contrast settings.
- Works in current Chrome, Edge, Firefox, Safari and Samsung Internet. It also works in older versions back to
  Safari/iOS 12, Chrome 64 and Firefox 67 through an automatic legacy build. Internet Explorer is not supported.

## Project structure

```
.github/workflows/deploy.yml   CI/CD: build + publish to GitHub Pages
index.html                     Page shell + Google/SEO information
public/                        Files served as-is (photos, favicon, robots.txt, sitemap.xml)
src/
  App.jsx                      Page layout and sections
  siteConfig.js                Your details and About text
  photos.js                    Photo list
  styles.css                   All styling
  useReveal.js                 Fade-in on scroll
  components/
    Frame.jsx                  A single photo with the film look
    FilmStrip.jsx              Scrollable 35mm film strip
    Lightbox.jsx               Full-screen photo viewer
    Decor.jsx                  Rotating stamp, word band, grease-pencil circle
```
