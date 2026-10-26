// Edit your personal details here.
// Texts are either the same in both languages ('simona.stories') or given per language
// ({ en: '…', bg: '…' }); a missing Bulgarian text falls back to the English one.
export const site = {
  name: { en: 'Simona Pacheliyska', bg: 'Симона Пачелийска' },
  tagline: { en: 'Street, light and portraits', bg: 'Градът, светлината и хората' },
  location: { en: 'Sofia & Smolyan, Bulgaria', bg: 'София и Смолян' },
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
      "I'm Simona, a photographer based in Sofia and Smolyan. I photograph people in real places: streets, squares and parks, wherever the light is best.",
      'My style is modern and clean: natural light, vivid colours and sharp detail. Sessions with me are relaxed, so the portraits come out confident and natural, never stiff.',
      "I'm available for portrait sessions and happy to collaborate on personal, creative and editorial projects.",
    ],
    bg: [
      'Казвам се Симона и съм фотограф в София и Смолян. Снимам хора в реална среда – по улиците, на площадите, в парка, там, където светлината е най-хубава.',
      'Стилът ми е модерен и изчистен: естествена светлина, наситени цветове и ясни детайли. Фотосесиите при мен са спокойни, затова портретите излизат уверени и естествени, а не изкуствени.',
      'Правя портретни фотосесии по поръчка и с удоволствие се включвам в съвместни проекти – лични, творчески или за медии.',
    ],
  },
}
