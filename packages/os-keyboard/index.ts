import type { Input } from '@os-keyboard/utils'
import { isTouchScreen, isInput, isHTMLElement, toggleClassName, inputAppend } from '@os-keyboard/utils'
import type { FocusTrigger, InputTrigger, TriggerEvent, KeyboardSize } from '@os-keyboard/constants'
import { MouseTrigger, TouchTrigger, ClassName, KEY_CODE_ATTR_NAME } from '@os-keyboard/constants'

interface OSKeyboardOption {
  size: KeyboardSize,
  zIndex: number
}
class OSKeyboard {
  private focusTrigger: FocusTrigger = MouseTrigger.FOCUS
  private inputTrigger: InputTrigger = MouseTrigger.INPUT
  private container: HTMLElement
  private sourceInput: Input | null = null
  private currentInput: Input | null = null
  constructor (option: OSKeyboardOption) {
    if (isTouchScreen()) {
      this.focusTrigger = TouchTrigger.FOCUS
      this.inputTrigger = TouchTrigger.INPUT
    }
    this.container = document.createElement('div')
    this.container.className = `${ClassName.KEYBOARD_CONTAINER} ${ClassName.HIDE} ${option.size}`
    document.body.appendChild(this.container)

    // add input focus event listener
    document.addEventListener<FocusTrigger>(this.focusTrigger, this.focusHandler)
    // add keyboard click event listener
    this.container.addEventListener<InputTrigger>(this.inputTrigger, this.keyboardClickHandler)
  }

  public setVisible(visible?: boolean) {
    if (visible !== undefined) {
      visible = !visible
    }
    toggleClassName(this.container, ClassName.HIDE, visible)
  }

  private focusHandler = (event: TriggerEvent) => {
    const eventTarget = event.target
    if (isInput(eventTarget)) {
      this.sourceInput = eventTarget
      this.currentInput = eventTarget
      this.setVisible(true)
      this.sourceInput.addEventListener('blur', this.blurHandler)
    }
  }
  private blurHandler = () => {
    if (this.sourceInput !== null) {
      this.sourceInput.removeEventListener('blur', this.blurHandler)
      this.sourceInput = null
      this.currentInput = null
    }
    this.setVisible(false)
  }
  private keyboardClickHandler = (event: TriggerEvent) => {
    event.preventDefault()
    if (this.currentInput === null) return
    const eventTarget = event.target
    if (isHTMLElement(eventTarget)) {
      const keyCode = this.getKeyCode(eventTarget)
      if (keyCode === -1) return
      inputAppend(this.currentInput, eventTarget.innerText)
    }
  }

  private getKeyCode(el: HTMLElement): number {
    const keyCode = parseInt(el.getAttribute(KEY_CODE_ATTR_NAME) || '-1')
    if (isNaN(keyCode)) {
      return -1
    }
    return keyCode
  }
}

export default OSKeyboard