import { ClassName, IconClassName, KeyCode, KEY_CODE_ATTR_NAME, KEY_DISABLED_ATTR_NAME, KeyDisabledStatus } from '@os-keyboard/constants'
import { Dictionary } from '@os-keyboard/dictionaries'
import type { Input } from '@os-keyboard/utils'
import { toggleClassName, isInput, dispatchInput } from '@os-keyboard/utils'

export class Association {
  private el: HTMLElement
  private input: Input
  private textBox: HTMLElement
  private candidateList: HTMLElement
  private dictionary: Dictionary | undefined
  private prevKey: HTMLElement
  private nextKey: HTMLElement
  private keyword = ''
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

    this.input = this.createElement('input', ClassName.ASSOCIATION_INPUT)
    this.input.type = 'text'

    this.textBox = this.createElement('div', ClassName.ASSOCIATION_TEXT_BOX, KeyCode.ASSOCIATION_INPUT)
    this.candidateList = this.createElement('div', ClassName.ASSOCIATION_CANDIDATE_LIST)
    this.prevKey = this.createElement(
      'span',
      ClassName.ASSOCIATION_CANDIDATE_OPTION,
      KeyCode.ASSOCIATION_PREV,
      `<i class="${IconClassName.BASE} ${IconClassName.PREV}"></i>`
    )
    this.prevKey.setAttribute(KEY_DISABLED_ATTR_NAME, KeyDisabledStatus.ENABLED)
    this.nextKey = this.createElement(
      'span',
      ClassName.ASSOCIATION_CANDIDATE_OPTION,
      KeyCode.ASSOCIATION_NEXT,
      `<i class="${IconClassName.BASE} ${IconClassName.NEXT}"></i>`
    )
    this.nextKey.setAttribute(KEY_DISABLED_ATTR_NAME, KeyDisabledStatus.ENABLED)

    this.el.append(closeKey, this.textBox, this.candidateList)
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
        this.keyword = value
        this.textBox.innerText = value
        this.associate(this.keyword, this.current, this.limit)
      } else {
        this.setVisible(false)
      }
    }
  }

  private associate = (keyboard: string, current: number, limit: number) => {
    if (this.dictionary === undefined) return
    const words = (this.dictionary[keyboard] || '').split('')
    const total = words.length
    const offset = (current - 1) * limit
    const end = offset + limit
    const wordsSlice = words.slice(offset, end)
    this.generateCandidateList(wordsSlice)
    toggleClassName(this.prevKey, ClassName.DISABLED, current === 1)
    this.prevKey.setAttribute(
      KEY_DISABLED_ATTR_NAME, current === 1 ? KeyDisabledStatus.DISABLED : KeyDisabledStatus.ENABLED
    )
    toggleClassName(this.nextKey, ClassName.DISABLED, total <= end)
    this.nextKey.setAttribute(
      KEY_DISABLED_ATTR_NAME, total <= end ? KeyDisabledStatus.DISABLED : KeyDisabledStatus.ENABLED
    )
  }

  public prev = () => {
    if (this.current === 1) return
    this.current -= 1
    this.associate(this.keyword, this.current, this.limit)
  }

  public next = () => {
    this.current += 1
    this.associate(this.keyword, this.current, this.limit)
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