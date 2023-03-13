import type { Key } from '@os-keyboard/layouts'
import { ClassName, KEY_CODE_ATTR_NAME } from '@os-keyboard/constants'

export class Keyboard {
  private el: HTMLElement
  constructor() {
    this.el = document.createElement('div')
    this.el.className = ClassName.KEYBOARD
  }

  getElement(): HTMLElement {
    return this.el
  }

  generateKeys(keys: Key[][]) {
    // computed rows max-width (keySize * baseWidth) + ((keyNum + 1) * keySpace)
    const rows: string[] = []
    const rowsWidth: number[] = []
    for (let i = 0; i < keys.length; i++) {
      const current = keys[i]
      const row: string[] = []
      let sizes = 0
      for (let j = 0; j < current.length; j++) {
        const key = current[j]
        if (key.size) {
          row.push(
            `<div class="${ClassName.KEYBOARD_KEY}" ${KEY_CODE_ATTR_NAME}="${key.keyCode}" style="width:${key.size * 10}%">${key.lc}</div>`
          )
          sizes += key.size * 10
        } else {
          row.push(`<div class="${ClassName.KEYBOARD_KEY}" ${KEY_CODE_ATTR_NAME}="${key.keyCode}">${key.lc}</div>`)
          sizes += 1 * 10
        }
      }
      rows.push(`<div class="${ClassName.KEYBOARD_ROW}">${row.join('')}</div>`)
      const width = (sizes * 3.75 * 100) + ((current.length + 1) * 0.375 * 1000)
      rowsWidth.push(width / 1000)
    }
    const max = Math.max(...rowsWidth)
    this.el.style.width = `${max}em`
    this.el.innerHTML = rows.join('')
  }
}