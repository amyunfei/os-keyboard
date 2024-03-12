import { OSKeyboard, qwertyLayout, qwertyZhLayout, ZH_PINYIN_DICT, JA_PINYIN_DICT } from '../publish/dist/index.es'
import '../publish/dist/style.css'
new OSKeyboard({
  size: 'small',
  zIndex: 2000,
  modes: [
    { name: 'en', layout: qwertyLayout },
    { name: '拼', layout: qwertyZhLayout, associate: ZH_PINYIN_DICT },
    { name: '日本語', layout: qwertyLayout, associate: JA_PINYIN_DICT }
  ]
})