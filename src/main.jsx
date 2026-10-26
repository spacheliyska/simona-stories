import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
// Fonts are bundled with the site (no requests to Google's servers, which matters for GDPR).
// Both have Cyrillic, so the Bulgarian version looks the same as the English one.
import '@fontsource-variable/playfair-display/wght.css'
import '@fontsource-variable/playfair-display/wght-italic.css'
import '@fontsource-variable/inter/wght.css'
import './styles.css'

// GitHub Pages can't send the header that stops other sites from showing this one
// inside a hidden frame (to trick visitors into clicking), so the built site
// simply doesn't start inside a frame.
const framed = import.meta.env.PROD && window.top !== window.self

if (!framed) {
  createRoot(document.getElementById('root')).render(
    <StrictMode>
      <App />
    </StrictMode>
  )
}

// Caches the site in the browser for fast repeat visits (see public/sw.js).
// Only on the built site: in dev it would serve stale files while you edit.
if (import.meta.env.PROD && !framed && 'serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register(`${import.meta.env.BASE_URL}sw.js`).catch(() => {})
  })
}
