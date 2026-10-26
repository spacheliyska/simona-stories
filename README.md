# simona-stories

This is my portfolio website. I'm **Simona Pacheliyska**, a street and portrait photographer based in Sofia and Smolyan, Bulgaria.
I keep the design clean and quiet so the photos do the talking: a warm dark background, one serif and one sans-serif font,
thin lines and plenty of space. The site is in English and Bulgarian.

**Live site:** https://spacheliyska.github.io/simona-stories/ (in Bulgarian: https://spacheliyska.github.io/simona-stories/bg/)

I built it with React 19 and Vite 7, and it deploys itself to GitHub Pages with GitHub Actions every time I push.

---

## Running it locally

1. Install [Node.js](https://nodejs.org) (LTS).
2. Put the photo files in `public/photos/` (they are not stored in this repo).
3. In this folder:
   ```
   npm install
   npm run dev
   ```
4. Open the address it prints (usually http://localhost:5173, and http://localhost:5173/bg/ for Bulgarian).
   The page reloads on its own when I save a file.

To check the final version exactly as it will be published (including the build for older browsers and the safety checks):

```
npm run build
npm run check
npm run preview
```

> **Note to self (Windows):** if `npm` or `git` "is not recognized", close VS Code completely and open it again.
> If it says "running scripts is disabled", use `npm.cmd` instead of `npm`.

## Where everything lives

| What | Where |
| --- | --- |
| My name, slogan, location, About text, email, Instagram (in both languages) | `src/siteConfig.js` |
| Gallery photos: titles, places, descriptions (in both languages), focus point | `src/photos.js` |
| Menu, headings, buttons and the copyright notice in both languages | `src/i18n.js` |
| Photo files | `public/photos/` (`01.jpg`, `02.jpg`, … and `me.jpg`, my portrait), not stored in this repo |
| Google title, description and keywords | `index.html` (English) and `bg/index.html` (Bulgarian) |
| Colours, fonts, layout | `src/styles.css` |

A text can be the same in both languages (`'Sofia'`) or given per language (`{ en: 'Sofia', bg: 'София' }`).
If I leave out the Bulgarian, the English one shows.

## English and Bulgarian

The flags in the top right switch the language. Each language has its own address, `…/` for English and `…/bg/` for
Bulgarian, so Google can show each person the right one and I can share either link (the Bulgarian one is good for my
Instagram bio). Switching is instant: nothing reloads and the page stays where the visitor was.

Both fonts (Playfair Display and Inter) have Cyrillic letters, so the Bulgarian version looks just like the English one.

## How I add a photo

1. Export it at about 2000px on the long side, JPG quality ~80, so the site stays fast. Full-size originals go in
   `originals/`, which is kept out of git.
2. Put it in `public/photos/` and add an entry for it in `src/photos.js`, with the title and description in both languages.
   The order there is the order on the site.
   - `alt` describes the photo in one sentence for people using screen readers.
   - `place` and `year` are optional: left as `''`, they simply don't show.
   - `focus` is the point that has to survive cropping (usually the eyes), as `'x% y%'` from the top-left.
3. Commit and push as usual.

My portrait (`me.jpg`) is the big photo on the front page and also appears in the About section.

## Deploying without downtime

The workflow in `.github/workflows/deploy.yml` runs on GitHub Actions:

- **Every push to `main`:** build → check → publish → check the live site (takes ~1–2 minutes).
- **Every pull request:** builds the site to check nothing is broken, without publishing.
- **Manually:** *Actions* tab → *Build and deploy* → *Run workflow*.

How it keeps the site up:

- **Nothing broken goes live.** Before publishing, `scripts/check-build.mjs` checks both pages, the security policy and that
  every photo is there. If anything fails, nothing is published and the live site keeps its last good version.
- **The switch is instant.** GitHub Pages swaps the whole site in one go, so nobody ever sees half a deploy.
- **One deploy at a time**, and a deploy is never cancelled halfway.
- **The live site is checked after every deploy** (both languages and a photo). If that fails, GitHub emails me.
- **Going back:** I revert the change in git and push; the previous version is rebuilt and checked like any other.

**Setup that has to stay this way:** **Settings** → **Pages** → *Build and deployment* → **Source** must be
**GitHub Actions**, not "Deploy from a branch". With the branch option, GitHub publishes the raw source files on every push
and the page comes up blank. The workflow warns about it and makes sure its own version lands last, but only the right
setting avoids the blank page completely.

Progress and errors are in the repository's **Actions** tab.

### If I move to my own domain

1. Buy a domain (e.g. `simonapacheliyska.com`) and add it under **Settings → Pages → Custom domain**.
2. In `.github/workflows/deploy.yml`, change `BASE_PATH` to `/`.
3. Replace `https://spacheliyska.github.io/simona-stories/` with the domain in `index.html`, `bg/index.html`,
   `public/robots.txt` and `public/sitemap.xml`.

## Security

The site is static: no server, database, logins, forms, cookies or third-party scripts, so there is very little to attack.
On top of that:

- **Content Security Policy:** browsers only run scripts and load files that come from this site, so injected code has
  nowhere to run from. It's added to both pages when the site is built (`vite.config.js`), and the build check fails
  without it.
- **No referrer** is sent to other sites, and external links open without any access back to this page.
- **No framing:** GitHub Pages can't send the header that stops other sites from showing mine inside a hidden frame,
  so the site simply doesn't start inside one.
- **HTTPS only:** GitHub Pages enforces it, and browsers are told to always use HTTPS.
- **The deploy pipeline:** every GitHub Action is pinned to an exact version, each job gets only the permissions it needs,
  and Dependabot proposes updates once a month (`.github/dependabot.yml`). `npm audit` reports no known vulnerabilities.

Nothing online is unhackable, so the weakest point left is my GitHub account. Things to keep switched on in GitHub:

- [ ] Two-factor authentication on my account (*Settings → Password and authentication*).
- [ ] A rule that blocks force-pushes and deleting `main` (*repo Settings → Rules → Rulesets*).
- [ ] Dependabot alerts and security updates (in the repo's *Settings*, security section).

## Getting found on Google

1. Add the site in [Google Search Console](https://search.google.com/search-console), submit `sitemap.xml`
   (it lists both languages) and click **Request indexing**.
2. Link the site from my Instagram bio and other profiles. Links pointing to the site help Google connect my name to it.

## Rights and privacy

- **Copyright:** all photos and texts are mine. The site footer states, in the visitor's language, that copying or using
  them without my written permission is prohibited, and `LICENSE` reserves all rights for this repository.
- **People in my photos:** where someone is clearly recognisable, I make sure I have their consent. If someone asks me to
  take a photo down, I remove it and redeploy.
- **Fonts** (Playfair Display, Inter) are under the SIL Open Font License and bundled with the site, so no visitor data is
  sent to Google Fonts (GDPR).
- **No cookies or analytics**, so no cookie banner is needed. If I ever add analytics, I need to add a consent banner.

## Accessibility and browser support

- Keyboard navigation, skip link, visible focus, screen-reader labels and an accessible photo viewer, in both languages.
- Respects "reduce motion" and Windows High Contrast settings.
- Works in current Chrome, Edge, Firefox, Safari and Samsung Internet, and in older versions back to
  Safari/iOS 12, Chrome 64 and Firefox 67 through an automatic legacy build. Internet Explorer is not supported.

## Project structure

```
.github/workflows/deploy.yml   CI/CD: build, check, publish to GitHub Pages, check the live site
.github/dependabot.yml         Monthly updates for the build tools and GitHub Actions
index.html                     English page shell + Google/SEO information
bg/index.html                  Bulgarian page shell + Google/SEO information
vite.config.js                 Build settings, security policy, photo content hashes
scripts/check-build.mjs        Checks the built site before it goes live
public/                        Files served as-is (service worker, favicon, robots.txt, sitemap.xml)
public/photos/                 Photo files (not stored in this repo)
src/
  main.jsx                     Entry point, fonts, service worker registration
  App.jsx                      Page layout and sections
  i18n.js                      Interface text in English and Bulgarian, language switching
  siteConfig.js                My details and About text
  photos.js                    Gallery photo list
  styles.css                   All styling
  useReveal.js                 Fade-in on scroll
  components/
    Frame.jsx                  A single photo (cropping, loading, caching URL)
    FilmStrip.jsx              The row of selected photos that scrolls sideways
    Lightbox.jsx               Full-screen photo viewer
    LanguageSwitch.jsx         EN / BG switch with flags
```
