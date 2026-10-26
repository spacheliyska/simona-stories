// Your photos. Put the files in /public/photos and list them here.
// Set `src` to null to show an empty frame until you add the photo.
// Texts are either the same in both languages or given per language ({ en: '…', bg: '…' }).
// `alt` is read aloud by screen readers: describe what's in the photo in one sentence.
// `place` and `year` are optional: leave them '' and they are simply not shown.
// `focus` is the point that must survive cropping, as 'x% y%' from the top-left
// (usually the eyes). The site crops photos to 2:3 and 4:5; that point keeps its
// relative position in the crop, so eyes ~30% down land near the upper third line.
//
// Order follows a simple sequencing rule: open with the strongest close portrait,
// then alternate close/wide, people/place, warm/cool, so no two neighbours look alike.
export const photos = [
  {
    src: '/photos/01.jpg', focus: '47% 27%', place: '', year: '',
    title: { en: 'Among the flowers', bg: 'Сред цветята' },
    alt: {
      en: 'A woman with long dark hair in a brown coat, standing in front of a wall of red geraniums.',
      bg: 'Жена с дълга тъмна коса и кафяво палто пред стена от червени мушката.',
    },
  },
  {
    src: '/photos/02.jpg', focus: '35% 36%', place: { en: 'Sofia', bg: 'София' }, year: '',
    title: { en: 'Under the lamps', bg: 'Под фенерите' },
    alt: {
      en: 'A woman in a white coat and tall cream boots leaning on a black street lamp in a stone square.',
      bg: 'Жена в бяло палто и високи кремави ботуши, облегната на черен уличен фенер на каменен площад.',
    },
  },
  {
    src: '/photos/03.jpg', focus: '54% 36%', place: '', year: '',
    title: { en: 'Autumn garden', bg: 'Есен в парка' },
    alt: {
      en: 'A woman in sunglasses, a camel jacket and black boots sitting on a white garden chair in a park.',
      bg: 'Жена със слънчеви очила, яке в цвят камел и черни ботуши, седнала на бял градински стол в парк.',
    },
  },
  {
    src: '/photos/04.jpg', focus: '47% 57%', place: '', year: '',
    title: { en: 'Last light', bg: 'Последни лъчи' },
    alt: {
      en: 'The sun setting behind a dark mountain ridge under a deep red sky.',
      bg: 'Слънцето залязва зад тъмен планински хребет под наситено червено небе.',
    },
  },
  {
    src: '/photos/05.jpg', focus: '44% 16%', place: '', year: '',
    title: { en: 'Fallen leaves', bg: 'Есенна шума' },
    alt: {
      en: 'A woman in jeans and a mauve top leaning against a tree trunk on a lawn covered in autumn leaves.',
      bg: 'Жена с дънки и бледолилава блуза, облегната на дърво на поляна, покрита с есенни листа.',
    },
  },
  {
    src: '/photos/06.jpg', focus: '50% 25%', place: '', year: '',
    title: { en: 'The bow tie', bg: 'Последни щрихи' },
    alt: {
      en: 'A young woman straightening the red bow tie of a young man in a burgundy suit.',
      bg: 'Млада жена оправя червената папийонка на младеж в бордо костюм.',
    },
  },
  {
    src: '/photos/07.jpg', focus: '51% 38%', place: '', year: '',
    title: { en: 'Pumpkin season', bg: 'Време за тикви' },
    alt: {
      en: 'A blonde woman in a black leather jacket sitting on hay bales among pumpkins and yellow chrysanthemums.',
      bg: 'Руса жена в черно кожено яке, седнала на бали сено сред тикви и жълти хризантеми.',
    },
  },
  {
    src: '/photos/08.jpg', focus: '36% 33%', place: { en: 'Sofia', bg: 'София' }, year: '',
    title: { en: 'Long coat', bg: 'Дългото палто' },
    alt: {
      en: 'A woman in a long brown coat holding a small white handbag in a wide paved square.',
      bg: 'Жена в дълго кафяво палто с малка бяла чанта в ръка на широк павиран площад.',
    },
  },
  {
    src: '/photos/09.jpg', focus: '60% 28%', place: '', year: '',
    title: { en: 'Morning coffee', bg: 'Сутрешно кафе' },
    alt: {
      en: 'A blonde woman in a white coat and scarf, eyes closed, at a café table with an iced coffee.',
      bg: 'Руса жена в бяло палто и шал, със затворени очи, на маса в кафене със студено кафе.',
    },
  },
  {
    src: '/photos/10.jpg', focus: '54% 35%', place: '', year: '',
    title: { en: 'On the steps', bg: 'На стъпалата' },
    alt: {
      en: 'A woman in jeans and white sneakers sitting on old stone steps in soft afternoon light.',
      bg: 'Жена с дънки и бели кецове, седнала на стари каменни стъпала в меката следобедна светлина.',
    },
  },
  {
    src: '/photos/11.jpg', focus: '43% 22%', place: '', year: '',
    title: { en: 'The bridge', bg: 'На мостчето' },
    alt: {
      en: 'A girl with long hair in a white sweatshirt crouching on a wooden footbridge.',
      bg: 'Момиче с дълга коса и бял суитшърт, приклекнало на дървено мостче.',
    },
  },
]
