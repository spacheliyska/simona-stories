import { useEffect, useRef } from 'react'
import Frame from './Frame.jsx'

const prefersReducedMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

// A horizontal 35mm film band with sprocket holes and edge markings.
// Moves with: touchpad (vertical or sideways swipe), mouse wheel, mouse drag,
// touch swipe, arrow keys when focused, and the Previous/Next buttons.
export default function FilmStrip({ photos, onOpen }) {
  const scroller = useRef(null)
  const drag = useRef(null)

  // Vertical touchpad / wheel scrolling moves the film sideways, then hands
  // control back to the page once the strip reaches either end.
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
      // Keep following the mouse even if it leaves the strip mid-drag.
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

  const step = (dir) => {
    const el = scroller.current
    const cell = el.querySelector('.strip-cell')
    const amount = cell ? cell.offsetWidth + 14 : el.clientWidth * 0.8
    el.scrollBy({ left: dir * amount, behavior: prefersReducedMotion() ? 'auto' : 'smooth' })
  }

  return (
    <div className="strip-wrap">
      <div
        ref={scroller}
        className="strip-scroll"
        tabIndex={0}
        role="region"
        aria-label="Film strip of selected photos"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onClickCapture={onClickCapture}
      >
        <div className="strip">
          <div className="sprockets" aria-hidden="true" />
          <ul className="strip-frames">
            {photos.map((p, i) => (
              <li key={i} className="strip-cell">
                <span className="edge-mark" aria-hidden="true">
                  <span>SP 400</span>
                  <span>▸ {i * 2 + 1}{i % 2 ? 'A' : ''}</span>
                </span>
                <Frame photo={p} index={i} onClick={() => onOpen(i)} />
              </li>
            ))}
          </ul>
          <div className="sprockets" aria-hidden="true" />
        </div>
      </div>

      <div className="strip-controls">
        <button type="button" className="pill" onClick={() => step(-1)}>
          <span aria-hidden="true">←</span> Previous frames
        </button>
        <p className="hint">Scroll, swipe or drag the film</p>
        <button type="button" className="pill" onClick={() => step(1)}>
          Next frames <span aria-hidden="true">→</span>
        </button>
      </div>
    </div>
  )
}
