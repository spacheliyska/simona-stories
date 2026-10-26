// Adds vendor prefixes (-webkit- etc.) for the browsers listed in package.json "browserslist".
import autoprefixer from 'autoprefixer'

export default {
  plugins: [autoprefixer()],
}
