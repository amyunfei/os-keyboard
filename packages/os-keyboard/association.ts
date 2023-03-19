import { ClassName, IconClassName, KeyCode, KEY_CODE_ATTR_NAME } from '@os-keyboard/constants'
import type { Input } from '@os-keyboard/utils'
import { toggleClassName } from '@os-keyboard/utils'

export class Association {
  private el: HTMLElement
  private input: Input
  private candidateList: HTMLElement
  constructor() {
    this.el = document.createElement('div')
    this.el.className = `${ClassName.KEYBOARD_ASSOCIATION} ${ClassName.HIDE}`

    const closeKey = document.createElement('div')
    closeKey.className = ClassName.ASSOCIATION_CLOSE
    closeKey.setAttribute(KEY_CODE_ATTR_NAME, KeyCode.ASSOCIATION_CLOSE.toString())
    closeKey.innerHTML = `<i class="${IconClassName.CLOSE}"></i>`

    this.input = document.createElement('input')
    this.input.type = 'text'
    this.input.className = ClassName.ASSOCIATION_INPUT
    this.input.setAttribute(KEY_CODE_ATTR_NAME, KeyCode.ASSOCIATION_INPUT.toString())

    this.candidateList = document.createElement('div')
    this.candidateList.className = ClassName.ASSOCIATION_CANDIDATE_LIST
    this.el.append(closeKey, this.input, this.candidateList)
    this.setVisible(true)
  }

  public getElement(): HTMLElement {
    return this.el
  }

  public getInput(): Input {
    return this.input
  }

  public setVisible(visible?: boolean) {
    if (visible !== undefined) {
      visible = !visible
    }
    toggleClassName(this.el, ClassName.HIDE, visible)
  }
}