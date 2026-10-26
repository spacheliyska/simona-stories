// Your photos. Put the files in /public/photos and list them here.
// Set `src` to null to show an empty "unexposed" frame until you add the photo.
// `alt` is read aloud by screen readers: describe what's in the photo in one sentence.
// `pick: true` circles the frame in red grease pencil on the contact sheet (your favourites).
//
// MOCK: these are placeholder stock photos from picsum.photos.
// When your real photos are ready, replace each `mock(...)` with '/photos/01.jpg' etc.
const mock = (id) => `https://picsum.photos/id/${id}/1200/1500`

export const photos = [
  { src: mock(64), title: 'Golden hour', place: 'Sofia', year: '2025' },
  { src: mock(1011), title: 'Facade', place: 'Sofia', year: '2025' },
  { src: mock(1025), title: 'Portrait in window light', place: 'Studio', year: '2024' },
  { src: mock(338), title: 'Rooftops at dusk', place: 'Smolyan', year: '2024', pick: true },
  { src: mock(1059), title: 'Portrait, late afternoon', place: 'Sofia', year: '2024' },
  { src: mock(1018), title: 'Sunset over the Rhodopes', place: 'Smolyan', year: '2023' },
  { src: mock(1080), title: 'Balconies', place: 'Sofia', year: '2023' },
  { src: mock(823), title: 'Last light', place: 'Sozopol', year: '2023', pick: true },
]
