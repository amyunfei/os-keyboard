import { OSKeyboard, qwertyLayout } from '../dist/bundle'
import '../dist/style.css'
new OSKeyboard({
  size: 'mini',
  zIndex: 2000,
  modes: [
    { name: 'en', layout: qwertyLayout }
  ]
})
