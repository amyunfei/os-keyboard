# os-keyboard
---

## Installation

```
npm install os-keyboard
```

## Example

```javascript
import { OSKeyboard, qwertyLayout, qwertyZhLayout, ZH_PINYIN_DICT } from 'os-keyboard'
import 'os-keyboard/dist/style.css'
new OSKeyboard({
  size: 'small',
  zIndex: 2000,
  modes: [
    { name: 'en', layout: qwertyLayout },
    { name: '拼', layout: qwertyZhLayout, associate: ZH_PINYIN_DICT },
  ]
})
```
