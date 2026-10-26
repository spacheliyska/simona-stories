import { useEffect, useRef } from 'react'
import Frame from './Frame.jsx'

const FOCUSABLE = 'button, a[href], [tabindex]:not([tabindex="-1"])'

export default function Lightbox({ photos, index, onChange, onClose }) {
  const dialog = useRef(null)
  const closeBtn = useRef(null)
  const photo = photos[index]
  const prev = () => onChange((index - 1 + photos.length) % photos.length)
  const next = () => onChange((index + 1) % photos.length)

  // Move focus into the viewer, lock page scroll, and give focus back on close.
  useEffect(() => {
    const opener = document.activeElement
    closeBtn.current?.focus()
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = ''
      opener?.focus?.()
    }
  }, [])

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      else if (e.key === 'ArrowLeft') prev()
      else if (e.key === 'ArrowRight') next()
      else if (e.key === 'Tab') {
        // Keep keyboard focus inside the viewer while it is open.
        const items = dialog.current.querySelectorAll(FOCUSABLE)
        const first = items[0]
        const last = items[items.length - 1]
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault()
          last.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  })

  return (
    <div
      ref={dialog}
      className="lightbox"
      role="dialog"
      aria-modal="true"
      aria-label="Photo viewer"
      onClick={onClose}
    >
      <button ref={closeBtn} type="button" className="lightbox-close pill" onClick={onClose}>
        Close <span aria-hidden="true">×</span>
      </button>
      <div className="lightbox-inner" onClick={(e) => e.stopPropagation()}>
        <Frame key={index} photo={photo} index={index} eager />
        <div className="lightbox-bar">
          <button type="button" className="pill" onClick={prev}>
            <span aria-hidden="true">←</span> Previous
          </button>
          <p className="lightbox-caption" aria-live="polite">
            <span className="label">{String(index + 1).padStart(2, '0')} / {String(photos.length).padStart(2, '0')}</span>{' '}
            {[photo.title, [photo.place, photo.year].filter(Boolean).join(', ')].filter(Boolean).join(' — ')}
          </p>
          <button type="button" className="pill" onClick={next}>
            Next <span aria-hidden="true">→</span>
          </button>
        </div>
      </div>
    </div>
  )
}
