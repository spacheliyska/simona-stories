// Purely decorative pieces. All hidden from screen readers.

// A slowly rotating circular stamp of text.
export function Badge({ text }) {
  return (
    <svg className="badge" viewBox="0 0 200 200" aria-hidden="true">
      <defs>
        <path id="badge-circle" d="M100,100 m-74,0 a74,74 0 1,1 148,0 a74,74 0 1,1 -148,0" />
      </defs>
      <text>
        <textPath href="#badge-circle" textLength="462" lengthAdjust="spacing">{text}</textPath>
      </text>
      <circle cx="100" cy="100" r="5" />
    </svg>
  )
}

// A band of large italic words drifting sideways.
export function Marquee({ words }) {
  const run = [...words, ...words, ...words]
  const line = run.map((w, i) => (
    <span key={i} className={i % 2 ? 'marquee-outline' : undefined}>
      {w} <span className="marquee-dot">✦</span>{' '}
    </span>
  ))
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track">
        <span>{line}</span>
        <span>{line}</span>
      </div>
    </div>
  )
}

// A hand-drawn red grease-pencil loop, like the marks on a contact sheet.
export function GreaseCircle() {
  return (
    <svg className="grease-circle" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
      <path
        pathLength="1"
        d="M55,5 C82,4 97,24 96,51 C95,80 74,97 47,96 C19,95 3,75 4,47 C5,21 25,5 57,8 C64,9 69,12 72,15"
      />
    </svg>
  )
}
