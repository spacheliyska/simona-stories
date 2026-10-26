import { useState } from 'react'
import { site } from './siteConfig.js'
import { photos } from './photos.js'
import { strings, pick, useLanguage } from './i18n.js'
import Frame from './components/Frame.jsx'
import FilmStrip from './components/FilmStrip.jsx'
import Lightbox from './components/Lightbox.jsx'
import LanguageSwitch from './components/LanguageSwitch.jsx'
import { useReveal } from './useReveal.js'

const year = new Date().getFullYear()
const shortYear = (y) => `'${String(y).slice(-2)}`
const frameNumber = (i) => String(i + 1).padStart(2, '0')
// A photo's texts in the current language.
const localize = (p, lang) => ({ ...p, title: pick(p.title, lang), place: pick(p.place, lang), alt: pick(p.alt, lang) })

export default function App() {
  const [lang, setLang] = useLanguage()
  const [open, setOpen] = useState(null)
  useReveal()
  const t = strings[lang]
  const name = pick(site.name, lang)
  const [firstName, ...lastName] = name.split(' ')
  const portrait = localize(site.portrait, lang)
  const items = photos.map((p) => localize(p, lang))
  const instagram = `https://www.instagram.com/${site.instagram}/`
  // While the photo viewer is open, hide the page behind it from keyboard and screen readers.
  const behindViewer = open !== null
  // `inert` for current browsers, `aria-hidden` as a fallback for older ones.
  const hideBehind = { inert: behindViewer, 'aria-hidden': behindViewer || undefined }

  return (
    <>
      <a className="skip-link" href="#main">{t.skip}</a>

      <header className="nav" {...hideBehind}>
        <a href="#main" className="nav-logo" aria-label={`${name}, ${t.home}`}>S.P.</a>
        <nav className="nav-links" aria-label={t.mainNav}>
          <a href="#work">{t.nav.work}</a>
          <a href="#about">{t.nav.about}</a>
          <a href="#contact">{t.nav.contact}</a>
        </nav>
        <LanguageSwitch lang={lang} onChange={setLang} label={t.languageNav} />
      </header>

      <main id="main" tabIndex={-1} {...hideBehind}>
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-text reveal">
            <p className="label">{t.photographer} · {pick(site.location, lang)}</p>
            <h1 id="hero-title">
              {firstName} <em>{lastName.join(' ')}</em>
            </h1>
            <p className="hero-tagline">{pick(site.tagline, lang)}</p>
          </div>
          <div className="hero-photo reveal" style={{ '--delay': '150ms' }}>
            <Frame photo={portrait} index={0} t={t} eager />
          </div>
        </section>

        <section id="work" className="section" aria-labelledby="work-title">
          <SectionHead id="work-title" number="01" title={t.selected} />
          <div className="reveal">
            <FilmStrip photos={items} onOpen={setOpen} t={t} />
          </div>
        </section>

        <section className="section" aria-labelledby="all-title">
          <SectionHead id="all-title" number="02" title={t.all} />
          <ul className="grid">
            {items.map((p, i) => (
              <li key={p.src || i} className="reveal" style={{ '--delay': `${(i % 4) * 80}ms` }}>
                <figure className="grid-item">
                  <Frame photo={p} index={i} t={t} onClick={() => setOpen(i)} />
                  <figcaption>
                    <span className="grid-number" aria-hidden="true">{frameNumber(i)}</span>
                    {p.title && <span className="grid-title">{p.title}</span>}
                    {(p.place || p.year) && (
                      <span className="grid-meta">{[p.place, p.year && shortYear(p.year)].filter(Boolean).join(' · ')}</span>
                    )}
                  </figcaption>
                </figure>
              </li>
            ))}
          </ul>
        </section>

        <section id="about" className="section" aria-labelledby="about-title">
          <SectionHead id="about-title" number="03" title={t.about} />
          <div className="about-layout">
            <div className="about-photo reveal">
              <Frame photo={portrait} index={1} t={t} />
            </div>
            <div className="about-body">
              {pick(site.about, lang).map((text, i) => (
                <p key={i} className="reveal" style={{ '--delay': `${i * 100}ms` }}>{text}</p>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="section" aria-labelledby="contact-title">
          <SectionHead id="contact-title" number="04" title={t.contactTitle} />
          <p className="contact-lead reveal">{t.contactLead}</p>
          <dl className="contact-list reveal" style={{ '--delay': '100ms' }}>
            <div>
              <dt className="label">{t.email}</dt>
              <dd><a href={`mailto:${site.email}`}>{site.email}</a></dd>
            </div>
            <div>
              <dt className="label">{t.instagram}</dt>
              <dd>
                <a href={instagram} target="_blank" rel="noreferrer">
                  @{site.instagram}
                  <span className="sr-only"> {t.newTab}</span>
                </a>
              </dd>
            </div>
          </dl>
        </section>
      </main>

      <footer className="footer" {...hideBehind}>
        <div className="footer-top">
          <p>© {year} {name}</p>
          <p>
            <a href={instagram} target="_blank" rel="noreferrer">
              @{site.instagram}<span className="sr-only"> {t.onInstagram} {t.newTab}</span>
            </a>
          </p>
        </div>
        <p className="footer-legal">{t.legal}</p>
      </footer>

      {open !== null && (
        <Lightbox photos={items} index={open} t={t} onChange={setOpen} onClose={() => setOpen(null)} />
      )}
    </>
  )
}

function SectionHead({ id, number, title }) {
  return (
    <div className="section-head reveal">
      <h2 id={id} className="section-title">{title}</h2>
      <span className="label" aria-hidden="true">{number}</span>
    </div>
  )
}
