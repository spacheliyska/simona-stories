import { useState } from 'react'
import { site } from './siteConfig.js'
import { photos } from './photos.js'
import Frame from './components/Frame.jsx'
import FilmStrip from './components/FilmStrip.jsx'
import Lightbox from './components/Lightbox.jsx'
import { Badge, Marquee, GreaseCircle } from './components/Decor.jsx'
import { useReveal } from './useReveal.js'

const today = new Date()
const dateStamp = `'${String(today.getFullYear()).slice(2)} ${String(today.getMonth() + 1).padStart(2, '0')} ${String(today.getDate()).padStart(2, '0')}`
const shortYear = (y) => `'${String(y).slice(-2)}`

export default function App() {
  const [open, setOpen] = useState(null)
  const hero = photos[0]
  useReveal()
  // While the photo viewer is open, hide the page behind it from keyboard and screen readers.
  const behindViewer = open !== null
  // `inert` for current browsers, `aria-hidden` as a fallback for older ones.
  const hideBehind = { inert: behindViewer, 'aria-hidden': behindViewer || undefined }

  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <div className="grain" aria-hidden="true" />
      <div className="vignette" aria-hidden="true" />

      <header className="nav" {...hideBehind}>
        <a href="#main" className="nav-logo" aria-label={`${site.name}, back to top`}>S.P.</a>
        <nav aria-label="Main">
          <a href="#work">Work</a>
          <a href="#contact-sheet">Contact sheet</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>

      <main id="main" tabIndex={-1} {...hideBehind}>
        <section className="hero" aria-labelledby="hero-title">
          <div className="leak leak-1" aria-hidden="true" />
          <div className="leak leak-2" aria-hidden="true" />
          <div className="hero-text reveal">
            <p className="label">Roll no. 01 — {site.location}</p>
            <h1 id="hero-title">
              Simona <em>Pacheliyska</em>
            </h1>
            <p className="hero-tagline">{site.tagline}</p>
          </div>
          <div className="hero-photo reveal" style={{ '--delay': '150ms' }}>
            <span className="tape tape-left" aria-hidden="true" />
            <span className="tape tape-right" aria-hidden="true" />
            <Frame photo={hero} index={0} onClick={() => setOpen(0)} eager />
            <span className="datestamp" aria-hidden="true">{dateStamp}</span>
            <Badge text="Street · Light · Portraits · Sofia · Smolyan · " />
          </div>
        </section>

        <section id="work" className="section" aria-labelledby="work-title">
          <h2 id="work-title" className="section-title reveal">
            <span className="section-num" aria-hidden="true">01</span> Selected frames
          </h2>
          <div className="reveal">
            <FilmStrip photos={photos} onOpen={setOpen} />
          </div>
        </section>

        <Marquee words={['Street', 'Light', 'Portraits', 'Sofia', 'Smolyan', 'Golden hour']} />

        <section id="contact-sheet" className="section" aria-labelledby="sheet-title">
          <h2 id="sheet-title" className="section-title reveal">
            <span className="section-num" aria-hidden="true">02</span> Contact sheet
          </h2>
          <ul className="sheet">
            {photos.map((p, i) => (
              <li key={i} className="reveal" style={{ '--delay': `${(i % 4) * 90}ms` }}>
                <figure className="sheet-item">
                  <div className="sheet-photo">
                    <Frame photo={p} index={i} onClick={() => setOpen(i)} />
                    {p.pick && <GreaseCircle />}
                    {p.pick && <span className="grease-note" aria-hidden="true">keeper!</span>}
                  </div>
                  <figcaption>
                    <span className="hand">{p.title}</span>
                    {(p.place || p.year) && (
                      <span className="label">{[p.place, p.year && shortYear(p.year)].filter(Boolean).join(' · ')}</span>
                    )}
                  </figcaption>
                </figure>
              </li>
            ))}
          </ul>
        </section>

        <section id="about" className="section about" aria-labelledby="about-title">
          <h2 id="about-title" className="section-title reveal">
            <span className="section-num" aria-hidden="true">03</span> About
          </h2>
          <div className="about-layout">
            <div className="about-print reveal">
              <span className="tape tape-center" aria-hidden="true" />
              <Frame photo={site.portrait} index={1} />
              <p className="hand about-print-caption" aria-hidden="true">me, by the sea</p>
            </div>
            <div className="about-body">
              {site.about.map((t, i) => (
                <p key={i} className="reveal" style={{ '--delay': `${i * 120}ms` }}>{t}</p>
              ))}
              <p className="signature reveal" style={{ '--delay': '400ms' }}>Simona</p>
            </div>
          </div>
        </section>

        <Marquee words={['Let’s make photographs', 'Sofia', 'Smolyan']} />

        <section id="contact" className="section contact" aria-labelledby="contact-title">
          <h2 id="contact-title" className="section-title reveal">
            <span className="section-num" aria-hidden="true">04</span> Let's make photographs
          </h2>
          <p className="contact-lead reveal">For portrait sessions, collaborations or just to say hi.</p>
          <dl className="contact-list reveal" style={{ '--delay': '120ms' }}>
            <div>
              <dt className="label">Email</dt>
              <dd><a href={`mailto:${site.email}`}>{site.email}</a></dd>
            </div>
            <div>
              <dt className="label">Instagram</dt>
              <dd>
                <a href={`https://www.instagram.com/${site.instagram}/`} target="_blank" rel="noreferrer">
                  @{site.instagram}
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              </dd>
            </div>
          </dl>
        </section>
      </main>

      <footer className="footer" {...hideBehind}>
        <p>
          © {today.getFullYear()} {site.name} ·{' '}
          <a href={`https://www.instagram.com/${site.instagram}/`} target="_blank" rel="noreferrer">
            @{site.instagram}<span className="sr-only"> on Instagram (opens in a new tab)</span>
          </a>
        </p>
        <p className="footer-legal">
          All photographs and texts on this website are the property of {site.name} and are protected by copyright.
          Copying, downloading, reproducing, editing or using them in any form without prior written permission is prohibited.
        </p>
        <p className="footer-legal" lang="bg">
          Всички снимки и текстове на този сайт са собственост на Симона Пачелийска и са защитени от авторското право.
          Копирането, изтеглянето, възпроизвеждането, обработването или използването им под каквато и да е форма без
          предварително писмено разрешение е забранено.
        </p>
      </footer>

      {open !== null && (
        <Lightbox photos={photos} index={open} onChange={setOpen} onClose={() => setOpen(null)} />
      )}
    </>
  )
}
