import { useEffect, useState } from 'react'

// All interface text, in English and Bulgarian. My own texts (About, photo titles…)
// live in siteConfig.js and photos.js.
// The language comes from the address: …/bg/ is Bulgarian, everything else English.
export const strings = {
  en: {
    name: 'English',
    title: 'Simona Pacheliyska — Street & Portrait Photographer',
    skip: 'Skip to content',
    home: 'back to top',
    mainNav: 'Main',
    languageNav: 'Language',
    nav: { work: 'Work', about: 'About', contact: 'Contact' },
    photographer: 'Photographer',
    selected: 'Selected frames',
    all: 'All frames',
    about: 'About',
    contactTitle: 'Let’s make photographs',
    contactLead: 'For portrait sessions, collaborations or just to say hi.',
    email: 'Email',
    instagram: 'Instagram',
    newTab: '(opens in a new tab)',
    onInstagram: 'on Instagram',
    strip: 'Selected photos, scrolls sideways',
    previousFrames: 'Previous frames',
    nextFrames: 'Next frames',
    hint: 'Scroll, swipe or drag',
    viewLarger: 'View larger',
    placeholder: 'Placeholder for',
    frame: 'frame',
    viewer: 'Photo viewer',
    close: 'Close',
    previous: 'Previous',
    next: 'Next',
    legal:
      'All photographs and texts on this website are the property of Simona Pacheliyska and are protected by copyright. Copying, downloading, reproducing, editing or using them in any form without prior written permission is prohibited.',
  },
  bg: {
    name: 'Български',
    title: 'Симона Пачелийска — улична и портретна фотография',
    skip: 'Към съдържанието',
    home: 'към началото',
    mainNav: 'Основно меню',
    languageNav: 'Език',
    nav: { work: 'Портфолио', about: 'За мен', contact: 'Контакти' },
    photographer: 'Фотограф',
    selected: 'Избрани кадри',
    all: 'Всички кадри',
    about: 'За мен',
    contactTitle: 'Да снимаме заедно',
    contactLead: 'Пишете ми за портретна фотосесия, съвместен проект или просто за поздрав.',
    email: 'Имейл',
    instagram: 'Instagram',
    newTab: '(отваря се в нов раздел)',
    onInstagram: 'в Instagram',
    strip: 'Избрани снимки, превъртат се хоризонтално',
    previousFrames: 'Предишни кадри',
    nextFrames: 'Следващи кадри',
    hint: 'Превъртете или плъзнете',
    viewLarger: 'Отвори в голям размер',
    placeholder: 'Място за снимка:',
    frame: 'кадър',
    viewer: 'Преглед на снимки',
    close: 'Затвори',
    previous: 'Предишна',
    next: 'Следваща',
    legal:
      'Всички снимки и текстове на този сайт са собственост на Симона Пачелийска и са защитени от авторското право. Копирането, изтеглянето, възпроизвеждането, обработването или използването им под каквато и да е форма без предварително писмено разрешение е забранено.',
  },
}

// A text is either the same in both languages ('Sofia') or given per language
// ({ en: 'Sofia', bg: 'София' }).
export const pick = (value, lang) =>
  value && typeof value === 'object' && !Array.isArray(value) ? (value[lang] ?? value.en) : value

const base = import.meta.env.BASE_URL
export const pathFor = (lang) => (lang === 'bg' ? `${base}bg/` : base)
const languageFrom = (path) => (path === `${base}bg` || path.startsWith(`${base}bg/`) ? 'bg' : 'en')

// The current language, and a way to switch it in place: no reload, the visitor
// stays where they are on the page, and the address changes so it can be shared.
export function useLanguage() {
  const [lang, setLang] = useState(() => languageFrom(window.location.pathname))

  // The browser's Back and Forward buttons switch the language too.
  useEffect(() => {
    const onPop = () => setLang(languageFrom(window.location.pathname))
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [])

  useEffect(() => {
    document.documentElement.lang = lang
    document.title = strings[lang].title
  }, [lang])

  const switchTo = (next) => {
    if (next === lang) return
    window.history.pushState(null, '', pathFor(next) + window.location.hash)
    setLang(next)
  }
  return [lang, switchTo]
}
