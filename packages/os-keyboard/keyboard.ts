import type { Layout } from '@os-keyboard/layouts'
import { ClassName, KEY_CODE_ATTR_NAME, KeyCode } from '@os-keyboard/constants'
import { toggleClassName } from '@os-keyboard/utils'

export class Keyboard {
  private el: HTMLElement
  constructor() {
    this.el = document.createElement('div')
    this.el.className = ClassName.KEYBOARD
  }

  getElement(): HTMLElement {
    return this.el
  }

  generateKeys(layout: Layout, modeName: string) {
    // computed rows max-width (keySize * baseWidth) + ((keyNum + 1) * keySpace)
    const rows: string[] = []
    const rowsWidth: number[] = []
    for (let i = 0; i < layout.length; i++) {
      const current = layout[i]
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
    const modeKey = this.el.querySelector(`[${KEY_CODE_ATTR_NAME}="${KeyCode.MODE}"]`)
    if (modeKey !== null) {
      modeKey.innerHTML = modeName
    }
  }

  setActiveKey(keyCode: KeyCode, active: boolean) {
    const keys = this.el.querySelectorAll<HTMLElement>(`[${KEY_CODE_ATTR_NAME}="${keyCode}"]`)
    keys.forEach(key => {
      toggleClassName(key, ClassName.ACTIVE, active)
    })
  }
}