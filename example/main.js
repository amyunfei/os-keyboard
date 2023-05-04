import { OSKeyboard, qwertyLayout, ZH_PINYIN_DICT } from 'os-keyboard'
import 'os-keyboard/dist/style.css'
new OSKeyboard({
  size: 'mini',
  zIndex: 2000,
  modes: [
    { name: 'en', layout: qwertyLayout },
    { name: '拼', layout: qwertyLayout, associate: ZH_PINYIN_DICT },
  ]
})