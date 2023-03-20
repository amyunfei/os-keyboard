import { ClassName, IconClassName, KeyCode, KEY_CODE_ATTR_NAME } from '@os-keyboard/constants'
import type { Input } from '@os-keyboard/utils'
import { toggleClassName } from '@os-keyboard/utils'

export class Association {
  private el: HTMLElement
  private input: Input
  private candidateList: HTMLElement
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

  public generateCandidateList(words: string[]) {
    // calculate current pagination
    const offset = (this.current - 1) * this.limit
    const end = offset + this.limit
    let wordsStr = ''
    for (let i = offset; i < end; i++) {
      if (i > words.length - 1) break
      wordsStr += `<span class="${ClassName.ASSOCIATION_CANDIDATE_OPTION}" ${KEY_CODE_ATTR_NAME}="${KeyCode.ASSOCIATION}">${words[i]}</span>`
    }
    this.candidateList.innerHTML = wordsStr
    this.candidateList.append(this.prevKey, this.nextKey)
  }
}