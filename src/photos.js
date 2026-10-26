// Your photos. Put the files in /public/photos and list them here.
// Set `src` to null to show an empty "unexposed" frame until you add the photo.
// `alt` is read aloud by screen readers: describe what's in the photo in one sentence.
// `pick: true` circles the frame in red grease pencil on the contact sheet (your favourites).
// `place` and `year` are optional: leave them '' and they are simply not shown.
// `focus` is the point that must survive cropping, as 'x% y%' from the top-left
// (usually the eyes). The site crops photos to 4:5 and 3:2; that point keeps its
// relative position in the crop, so eyes ~30% down land near the upper third line.
//
// Order follows a simple sequencing rule: open with the strongest close portrait,
// then alternate close/wide, people/place, warm/cool, so no two neighbours look alike.
export const photos = [
  { src: '/photos/01.jpg', focus: '47% 27%', title: 'Among the flowers', place: '', year: '', alt: 'A woman with long dark hair in a brown coat, standing in front of a wall of red geraniums.' },
  { src: '/photos/02.jpg', focus: '35% 36%', title: 'Under the lamps', place: 'Sofia', year: '', alt: 'A woman in a white coat and tall cream boots leaning on a black street lamp in a stone square.', pick: true },
  { src: '/photos/03.jpg', focus: '54% 36%', title: 'Autumn garden', place: '', year: '', alt: 'A woman in sunglasses, a camel jacket and black boots sitting on a white garden chair in a park.' },
  { src: '/photos/04.jpg', focus: '47% 57%', title: 'Last light', place: '', year: '', alt: 'The sun setting behind a dark mountain ridge under a deep red sky.', pick: true },
  { src: '/photos/05.jpg', focus: '44% 16%', title: 'Fallen leaves', place: '', year: '', alt: 'A woman in jeans and a mauve top leaning against a tree trunk on a lawn covered in autumn leaves.' },
  { src: '/photos/06.jpg', focus: '50% 25%', title: 'The bow tie', place: '', year: '', alt: 'A young woman straightening the red bow tie of a young man in a burgundy suit.' },
  { src: '/photos/07.jpg', focus: '51% 38%', title: 'Pumpkin season', place: '', year: '', alt: 'A blonde woman in a black leather jacket sitting on hay bales among pumpkins and yellow chrysanthemums.' },
  { src: '/photos/08.jpg', focus: '36% 33%', title: 'Long coat', place: 'Sofia', year: '', alt: 'A woman in a long brown coat holding a small white handbag in a wide paved square.' },
  { src: '/photos/09.jpg', focus: '60% 28%', title: 'Morning coffee', place: '', year: '', alt: 'A blonde woman in a white coat and scarf, eyes closed, at a café table with an iced coffee.' },
  { src: '/photos/10.jpg', focus: '54% 35%', title: 'On the steps', place: '', year: '', alt: 'A woman in jeans and white sneakers sitting on old stone steps in soft afternoon light.' },
  { src: '/photos/11.jpg', focus: '43% 22%', title: 'The bridge', place: '', year: '', alt: 'A girl with long hair in a white sweatshirt crouching on a wooden footbridge.' },
]
