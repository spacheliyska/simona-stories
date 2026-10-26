import { useEffect, useRef, useState } from 'react'

// '/photos/01.jpg' → works whether the site lives at the domain root or in a
// sub-folder (e.g. GitHub Pages: /simona-stories/photos/01.jpg).
// Local photos get their content hash appended (see vite.config.js) so caches refresh on change.
const withBase = (src) => {
  if (!src?.startsWith('/')) return src
  const v = __PHOTO_VERSIONS__[src]
  return import.meta.env.BASE_URL + src.slice(1) + (v ? `?v=${v}` : '')
}

// A single photo, cropped around its focus point. Falls back to an empty frame
// if the image is missing, so the layout looks right before photos are added.
// With `onClick` it renders as a button (opens the viewer); without, a plain block.
export default function Frame({ photo, index, t, onClick, eager = false }) {
  const [failed, setFailed] = useState(false)
  const [loaded, setLoaded] = useState(false)
  const img = useRef(null)
  const empty = !photo?.src || failed
  const description = photo?.alt || [photo?.title, photo?.place].filter(Boolean).join(', ')

  // Cached images can finish loading before React attaches onLoad.
  useEffect(() => {
    if (img.current?.complete && img.current.naturalWidth) setLoaded(true)
  }, [])

  const content = empty ? (
    <div className="frame-empty" role="img" aria-label={`${t.placeholder} ${description}`}>
      <span className="label" aria-hidden="true">{t.frame} {String(index + 1).padStart(2, '0')}</span>
    </div>
  ) : (
    <img
      ref={img}
      src={withBase(photo.src)}
      alt={description}
      style={photo.focus ? { '--focus': photo.focus } : undefined}
      className={loaded ? 'is-loaded' : undefined}
      loading={eager ? 'eager' : 'lazy'}
      draggable={false}
      onLoad={() => setLoaded(true)}
      onError={() => setFailed(true)}
    />
  )

  if (!onClick) return <div className="frame">{content}</div>

  return (
    <button
      type="button"
      className="frame"
      onClick={onClick}
      aria-label={`${t.viewLarger}: ${description}${photo?.year ? ` (${photo.year})` : ''}`}
    >
      {content}
    </button>
  )
}
