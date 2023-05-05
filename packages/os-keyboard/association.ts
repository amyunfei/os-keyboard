import { ClassName, IconClassName, KeyCode, KEY_CODE_ATTR_NAME } from '@os-keyboard/constants'
import { Dictionary } from '@os-keyboard/dictionaries'
import type { Input } from '@os-keyboard/utils'
import { toggleClassName, isInput, dispatchInput } from '@os-keyboard/utils'

export class Association {
  private el: HTMLElement
  private input: Input
  private candidateList: HTMLElement
  private dictionary: Dictionary | undefined
  private prevKey: HTMLElement
  private nextKey: HTMLElement
  private limit = 10
  private current = 1
  constructor() {
    this.el = this.createElement('div', `${ClassName.KEYBOARD_ASSOCIATION} ${ClassName.HIDE}`)

    const closeKey = this.createElement(
      'div',
      ClassName.ASSOCIATION_CLOSE,
      KeyCode.ASSOCIATION_CLOSE,
      `<i class="${IconClassName.BASE} ${IconClassName.CLOSE}"></i>`
    )

    this.input = this.createElement('input', ClassName.ASSOCIATION_INPUT, KeyCode.ASSOCIATION_INPUT)
    this.input.type = 'text'
    this.candidateList = this.createElement('div', ClassName.ASSOCIATION_CANDIDATE_LIST)
    this.prevKey = this.createElement(
      'span',
      ClassName.ASSOCIATION_CANDIDATE_OPTION,
      KeyCode.ASSOCIATION_PREV,
      `<i class="${IconClassName.BASE} ${IconClassName.PREV}"></i>`
    )
    this.nextKey = this.createElement(
      'span',
      ClassName.ASSOCIATION_CANDIDATE_OPTION,
      KeyCode.ASSOCIATION_NEXT,
      `<i class="${IconClassName.BASE} ${IconClassName.NEXT}"></i>`
    )

    this.el.append(closeKey, this.input, this.candidateList)
  }

  public setDictionary(dictionary: Dictionary) {
    this.dictionary = dictionary
    this.input.oninput = this.handleInput
  }

  private createElement<T extends keyof HTMLElementTagNameMap>(tagName: T, className: string, keyCode?: KeyCode, innerHTML?: string) {
    const el = document.createElement(tagName)
    el.className = className
    if (keyCode !== undefined) {
      el.setAttribute(KEY_CODE_ATTR_NAME, keyCode.toString())
    }
    if (innerHTML !== undefined) {
      el.innerHTML = innerHTML
    }
    return el
  }

  private handleInput = (event: Event) => {
    const eventTarget = event.target
    if (isInput(eventTarget)) {
      const value = eventTarget.value
      if (value) {
        this.setVisible(true)
        this.current = 1
        this.associate(value, this.current, this.limit)
      } else {
        this.setVisible(false)
      }
    }
  }

  private associate = (keyboard: string, current: number, limit: number) => {
    if (this.dictionary === undefined) return
    const words = (this.dictionary[keyboard] || '').split('')
    const offset = (current - 1) * limit
    const end = offset + limit
    const wordsSlice = words.slice(offset, end)
    this.generateCandidateList(wordsSlice)
    if (current === 1) {
      toggleClassName(this.prevKey, ClassName.DISABLED, true)
    }
    toggleClassName(this.nextKey, ClassName.DISABLED, words.length <= end)
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

  public clear() {
    dispatchInput(this.input, '')
  }

  public generateCandidateList(words: string[]) {
    let wordsStr = ''
    for (let i = 0; i < words.length; i++) {
      wordsStr += `<span class="${ClassName.ASSOCIATION_CANDIDATE_OPTION}" ${KEY_CODE_ATTR_NAME}="${KeyCode.ASSOCIATION}">${words[i]}</span>`
    }
    this.candidateList.innerHTML = wordsStr
    this.candidateList.append(this.prevKey, this.nextKey)
  }
}