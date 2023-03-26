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
    this.el = document.createElement('div')
    this.el.className = `${ClassName.KEYBOARD_ASSOCIATION} ${ClassName.HIDE}`

    const closeKey = document.createElement('div')
    closeKey.className = ClassName.ASSOCIATION_CLOSE
    closeKey.setAttribute(KEY_CODE_ATTR_NAME, KeyCode.ASSOCIATION_CLOSE.toString())
    closeKey.innerHTML = `<i class="${IconClassName.BASE} ${IconClassName.CLOSE}"></i>`

    this.input = document.createElement('input')
    this.input.type = 'text'
    this.input.className = ClassName.ASSOCIATION_INPUT
    this.input.setAttribute(KEY_CODE_ATTR_NAME, KeyCode.ASSOCIATION_INPUT.toString())

    this.candidateList = document.createElement('div')
    this.candidateList.className = ClassName.ASSOCIATION_CANDIDATE_LIST
    this.candidateList.innerHTML = ''

    this.prevKey = document.createElement('span')
    this.prevKey.className = ClassName.ASSOCIATION_CANDIDATE_OPTION
    this.prevKey.setAttribute(KEY_CODE_ATTR_NAME, KeyCode.ASSOCIATION_PREV.toString())
    this.prevKey.innerHTML = `<i class="${IconClassName.BASE} ${IconClassName.PREV}"></i>`

    this.nextKey = document.createElement('span')
    this.nextKey.className = ClassName.ASSOCIATION_CANDIDATE_OPTION
    this.nextKey.setAttribute(KEY_CODE_ATTR_NAME, KeyCode.ASSOCIATION_NEXT.toString())
    this.nextKey.innerHTML = `<i class="${IconClassName.BASE} ${IconClassName.NEXT}"></i>`

    this.el.append(closeKey, this.input, this.candidateList)
  }

  public setDictionary(dictionary: Dictionary) {
    this.dictionary = dictionary
    this.input.oninput = this.handleInput
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