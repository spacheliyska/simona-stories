import { useEffect, useRef } from 'react'
import Frame from './Frame.jsx'

const prefersReducedMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

// A horizontal row of photos.
// Moves with: touchpad (vertical or sideways swipe), mouse wheel, mouse drag,
// touch swipe, arrow keys when focused, and the Previous/Next buttons.
export default function FilmStrip({ photos, onOpen, t }) {
  const scroller = useRef(null)
  const drag = useRef(null)

  // Vertical touchpad / wheel scrolling moves the row sideways, then hands
  // control back to the page once the row reaches either end.
  useEffect(() => {
    const el = scroller.current
    const onWheel = (e) => {
      if (Math.abs(e.deltaX) >= Math.abs(e.deltaY)) return // sideways swipe: native scrolling handles it
      const delta = e.deltaMode === 1 ? e.deltaY * 16 : e.deltaY
      const max = el.scrollWidth - el.clientWidth
      if ((delta < 0 && el.scrollLeft <= 0) || (delta > 0 && el.scrollLeft >= max - 1)) return
      e.preventDefault()
      el.scrollLeft += delta
    }
    el.addEventListener('wheel', onWheel, { passive: false })
    return () => el.removeEventListener('wheel', onWheel)
  }, [])

  // Click-and-drag with a mouse (touch screens already swipe natively).
  const onPointerDown = (e) => {
    if (e.pointerType !== 'mouse' || e.button !== 0) return
    drag.current = { x: e.clientX, left: scroller.current.scrollLeft, active: true, moved: false }
  }
  const onPointerMove = (e) => {
    const d = drag.current
    if (!d?.active) return
    const dx = e.clientX - d.x
    if (!d.moved && Math.abs(dx) > 5) {
      d.moved = true
      // Keep following the mouse even if it leaves the row mid-drag.
      scroller.current.setPointerCapture(e.pointerId)
    }
    if (d.moved) scroller.current.scrollLeft = d.left - dx
  }
  const endDrag = () => {
    if (drag.current) drag.current.active = false
  }
  // A drag shouldn't also open the photo it ended on.
  const onClickCapture = (e) => {
    if (drag.current?.moved) {
      e.preventDefault()
      e.stopPropagation()
    }
    drag.current = null
  }

  // One photo per press.
  const step = (dir) => {
    const el = scroller.current
    const cell = el.querySelector('.strip-cell')
    const gap = cell ? parseFloat(getComputedStyle(cell.parentElement).columnGap) || 0 : 0
    const amount = cell ? cell.offsetWidth + gap : el.clientWidth * 0.8
    el.scrollBy({ left: dir * amount, behavior: prefersReducedMotion() ? 'auto' : 'smooth' })
  }

  return (
    <div className="strip">
      <div
        ref={scroller}
        className="strip-scroll"
        tabIndex={0}
        role="region"
        aria-label={t.strip}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onClickCapture={onClickCapture}
      >
        <ul className="strip-frames">
          {photos.map((p, i) => (
            <li key={p.src || i} className="strip-cell">
              <Frame photo={p} index={i} t={t} onClick={() => onOpen(i)} />
            </li>
          ))}
        </ul>
      </div>

      <div className="strip-controls">
        <p className="hint">{t.hint}</p>
        <div className="strip-buttons">
          <button type="button" className="round-button" onClick={() => step(-1)}>
            <span aria-hidden="true">←</span>
            <span className="sr-only">{t.previousFrames}</span>
          </button>
          <button type="button" className="round-button" onClick={() => step(1)}>
            <span aria-hidden="true">→</span>
            <span className="sr-only">{t.nextFrames}</span>
          </button>
        </div>
      </div>
    </div>
  )
}
