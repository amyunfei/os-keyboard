import type { Key, Layout } from '@os-keyboard/layouts'
import { ClassName, KEY_CODE_ATTR_NAME, KeyCode } from '@os-keyboard/constants'
import { toggleClassName } from '@os-keyboard/utils'

type KeyText = Omit<Key, 'keyCode' | 'size'>
export class Keyboard {
  private el: HTMLElement
  private deadKeys: Map<KeyCode, KeyText> = new Map()
  constructor() {
    this.el = document.createElement('div')
    this.el.className = ClassName.KEYBOARD
  }

  getElement(): HTMLElement {
    return this.el
  }

  generateKeys(layout: Layout, modeName: string) {
    // computed rows max-width (keySize * baseWidth) + ((keyNum + 1) * keySpace)
    this.deadKeys.clear()
    const rows: string[] = []
    let maxWidth = 0
    for (let i = 0; i < layout.length; i++) {
      const current = layout[i]
      const row: string[] = []
      let rowWidth = 0
      for (let j = 0; j < current.length; j++) {
        const key = current[j]
        const keyWidth = (key.size || 1) * 10
        const keyStyle = key.size ? `style="width:${keyWidth}%"` : ''
        const keyCodeAttr = `${KEY_CODE_ATTR_NAME}="${key.keyCode}"`
        let keyClass: string = ClassName.KEYBOARD_KEY
        let keyInner = `<div class="${ClassName.KEY_TEXT_PRIMARY}">${key.pri}</div>`
        const keyText: KeyText = { pri: key.pri }
        if (key.sec) {
          keyClass += ` ${ClassName.DOUBLE}`
          keyInner += `<div class="${ClassName.KEY_TEXT_SECONDARY}">${key.sec}</div>`
          keyText.sec = key.sec
        }
        this.deadKeys.set(key.keyCode, keyText)
        row.push(
          `<div class="${keyClass}" ${keyCodeAttr} ${keyStyle}>${keyInner}</div>`
        )
        rowWidth += keyWidth
      }
      rows.push(`<div class="${ClassName.KEYBOARD_ROW}">${row.join('')}</div>`)
      const width = (rowWidth * 0.375) + ((current.length + 1) * 0.375)
      maxWidth = Math.max(maxWidth, width)
    }
    this.el.style.width = `${maxWidth}em`
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
    let secondarySelector = ''
    let priAttr: keyof KeyText = 'pri'
    let secAttr: keyof KeyText = 'pri'
    if (keyCode === KeyCode.SHIFT) {
      secondarySelector = `.${ClassName.KEY_TEXT_SECONDARY}`
      priAttr = active ? 'sec' : 'pri'
      secAttr = active ? 'pri' : 'sec'
    } else if (keyCode === KeyCode.ALT) {
      secondarySelector = `.${ClassName.KEY_TEXT_TERTIARY}`
      priAttr = 'tert'
    }
    for (const code of this.deadKeys.keys()) {
      const keys = this.el.querySelectorAll<HTMLElement>(`[${KEY_CODE_ATTR_NAME}="${code}"]`)
      if (keys.length === 0) continue
      const text = this.deadKeys.get(code)
      if (text === undefined) continue
      keys.forEach(key => {
        const primary = key.querySelector<HTMLElement>(`.${ClassName.KEY_TEXT_PRIMARY}`)
        const secondary = key.querySelector<HTMLElement>(secondarySelector)
        if (primary !== null && secondary !== null) {
          primary.innerText = text[priAttr] || ''
          secondary.innerText = text[secAttr] || ''
        }
      })
    }
  }
}