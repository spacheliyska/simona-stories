import { strings, pathFor } from '../i18n.js'

// EN / BG switch with small flags. Each language has its own address (…/ and …/bg/),
// so Google finds both and either can be shared; a plain click switches without reloading.
export default function LanguageSwitch({ lang, onChange, label }) {
  const onClick = (e, code) => {
    // Ctrl/Cmd/Shift-click or middle-click: let the browser open a new tab or window.
    if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
    e.preventDefault()
    onChange(code)
  }
  return (
    <nav className="lang" aria-label={label}>
      {['en', 'bg'].map((code) => (
        <a
          key={code}
          href={pathFor(code)}
          hrefLang={code}
          lang={code}
          aria-current={code === lang ? 'true' : undefined}
          onClick={(e) => onClick(e, code)}
        >
          {code === 'bg' ? <BulgarianFlag /> : <BritishFlag />}
          {code.toUpperCase()}
          <span className="sr-only"> {strings[code].name}</span>
        </a>
      ))}
    </nav>
  )
}

function BulgarianFlag() {
  return (
    <svg className="flag" viewBox="0 0 5 3" aria-hidden="true">
      <rect width="5" height="1" fill="#fff" />
      <rect y="1" width="5" height="1" fill="#00966e" />
      <rect y="2" width="5" height="1" fill="#d62612" />
    </svg>
  )
}

function BritishFlag() {
  return (
    <svg className="flag" viewBox="0 0 60 30" aria-hidden="true">
      <clipPath id="flag-uk-diagonals">
        <path d="M30,15 h30 v15 z v15 h-30 z h-30 v-15 z v-15 h30 z" />
      </clipPath>
      <path d="M0,0 v30 h60 v-30 z" fill="#012169" />
      <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6" />
      <path d="M0,0 L60,30 M60,0 L0,30" clipPath="url(#flag-uk-diagonals)" stroke="#c8102e" strokeWidth="4" />
      <path d="M30,0 v30 M0,15 h60" stroke="#fff" strokeWidth="10" />
      <path d="M30,0 v30 M0,15 h60" stroke="#c8102e" strokeWidth="6" />
    </svg>
  )
}
