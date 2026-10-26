// Edit your personal details here.
// Texts are either the same in both languages ('simona.stories') or given per language
// ({ en: '…', bg: '…' }); a missing Bulgarian text falls back to the English one.
export const site = {
  name: { en: 'Simona Pacheliyska', bg: 'Симона Пачелийска' },
  tagline: { en: 'Street, light and portraits', bg: 'Улици, светлина и портрети' },
  location: { en: 'Sofia & Smolyan, Bulgaria', bg: 'София и Смолян, България' },
  email: 'pacheliyskasimona@gmail.com',
  instagram: 'simona.stories',
  // Your photo for the front page and the About section. Put it in /public/photos/me.jpg
  portrait: {
    src: '/photos/me.jpg',
    focus: '44% 52%',
    title: { en: 'Simona', bg: 'Симона' },
    place: '',
    year: '',
    alt: {
      en: 'Simona Pacheliyska walking barefoot along the shoreline at golden hour, sandals in hand',
      bg: 'Симона Пачелийска върви боса по брега на морето в златния час, със сандали в ръка',
    },
  },
  about: {
    en: [
      "I'm Simona, a photographer drawn to the quiet character of cities: the lines and textures of buildings, the slow drama of a sunset settling over rooftops, and the faces of the people I portray.",
      'My work is guided by warm light, gentle grain and an unhurried attention to detail. I look for images that feel less like documents and more like recollections, as though remembered rather than simply seen.',
      'I welcome commissions for portrait sessions, as well as collaborations on personal and editorial projects.',
    ],
    bg: [
      'Казвам се Симона. Като фотограф ме привлича тихият характер на градовете: линиите и текстурите на сградите, бавната драма на залеза над покривите и лицата на хората, които снимам.',
      'В работата си следвам топлата светлина, деликатното зърно и спокойното внимание към детайла. Търся кадри, които са по-скоро спомени, отколкото документи – сякаш запомнени, а не просто видени.',
      'Приемам поръчки за портретни фотосесии, както и предложения за сътрудничество по лични и редакционни проекти.',
    ],
  },
}
