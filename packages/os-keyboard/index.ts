import { Input, inputCursorMove } from '@os-keyboard/utils'
import { FocusTrigger, InputTrigger, TriggerEvent, KeyboardSize, KEY_DISABLED_ATTR_NAME, KeyDisabledStatus, keyboardSizeToFontSize } from '@os-keyboard/constants'
import { MouseTrigger, TouchTrigger, ClassName, KEY_CODE_ATTR_NAME, KeyCode } from '@os-keyboard/constants'
import {
  isTouchScreen, isInput, isHTMLElement, toggleClassName, inputAppend, inputBackspace,
  inputDelete, inputEnter
} from '@os-keyboard/utils'
import { Keyboard } from './keyboard'
import { Association } from './association'
import type { Layout } from '@os-keyboard/layouts'
import { Dictionary } from '@os-keyboard/dictionaries'

type FnKeyHandler = (value: string, currentInput: Input, instance: OSKeyboard) => void
interface KeyboardMode {
  name: string,
  layout: Layout,
  associate?: Dictionary
}
interface OSKeyboardOption {
  size: KeyboardSize,
  zIndex: number,
  modes: KeyboardMode[]
}
export class OSKeyboard {
  private focusTrigger: FocusTrigger = MouseTrigger.FOCUS
  private inputTrigger: InputTrigger = MouseTrigger.INPUT
  private container: HTMLElement
  private sourceInput: Input | null = null
  private currentInput: Input | null = null
  private fnMap: Map<KeyCode, FnKeyHandler> = new Map()
  private modeMap: Map<string, KeyboardMode> = new Map()
  private modeKeys: string[] = []
  private currentMode = ''
  private keyboard: Keyboard
  private association: Association
  private shiftKey = false
  private capsLockKey = false
  private altKey = false
  constructor (option: OSKeyboardOption) {
    if (isTouchScreen()) {
      this.focusTrigger = TouchTrigger.FOCUS
      this.inputTrigger = TouchTrigger.INPUT
    }
    const { size } = option
    const fontSize = keyboardSizeToFontSize[size]

    this.keyboard = new Keyboard()
    this.association = new Association()
    this.container = document.createElement('div')
    this.container.className = `${ClassName.KEYBOARD_CONTAINER} ${ClassName.HIDE}`
    this.container.style.fontSize = fontSize
    this.container.appendChild(this.association.getElement())
    this.container.appendChild(this.keyboard.getElement())
    document.body.appendChild(this.container)

    // add input focus event listener
    document.addEventListener<FocusTrigger>(this.focusTrigger, this.focusHandler)
    // add keyboard click event listener
    this.container.addEventListener<InputTrigger>(this.inputTrigger, this.keyboardClickHandler)

    // set fn keys handler
    this.setFnKey(KeyCode.BACKSPACE, (_, currentInput, instance) => {
      const input = currentInput.value ? currentInput : instance.sourceInput
      if (input !== null) {
        inputBackspace(input)
      }
    })
    this.setFnKey(KeyCode.DELETE, (_, currentInput, instance) => {
      const input = currentInput.value ? currentInput : instance.sourceInput
      if (input !== null) {
        inputDelete(input)
      }
    })
    this.setFnKey(KeyCode.CLOSE, (_, _currentInput, instance) => { instance.setVisible(false) })
    this.setFnKey(KeyCode.TAB, (_, currentInput) => { inputAppend(currentInput, '\t') })
    this.setFnKey(KeyCode.ENTER, (_, currentInput) => {
      inputAppend(currentInput, '\r')
      inputEnter(currentInput)
    })
    this.setFnKey(KeyCode.MODE, (_, _currentInput, instance) => {
      // switch to next mode
      const index = instance.modeKeys.indexOf(instance.currentMode)
      const currentIndex = (index + 1) % instance.modeKeys.length
      this.currentMode = instance.modeKeys[currentIndex]
      this.render()
    })
    this.setFnKey(KeyCode.SHIFT, (_, _currentInput, instance) => {
      instance.shiftKey = !instance.shiftKey
      this.keyboard.setActiveKey(KeyCode.SHIFT, instance.shiftKey)
      this.keyboard.setShiftMode(instance.shiftKey)
      this.keyboard.setCapMode(instance.shiftKey || instance.capsLockKey)
    })
    this.setFnKey(KeyCode.ALT, (_, _currentInput, instance) => {
      instance.altKey = !instance.altKey
      this.keyboard.setActiveKey(KeyCode.ALT, instance.altKey)
      this.keyboard.setAltMode(instance.altKey)
    })
    this.setFnKey(KeyCode.CAPSLOCK, (_, _currentInput, instance) => {
      instance.capsLockKey = !instance.capsLockKey
      this.keyboard.setActiveKey(KeyCode.CAPSLOCK, instance.capsLockKey)
      this.keyboard.setCapMode(instance.shiftKey || instance.capsLockKey)
    })
    this.setFnKey(KeyCode.LEFT, (_, _currentInput, instance) => {
      if (instance.sourceInput === null) return
      inputCursorMove(instance.sourceInput, -1)
    })
    this.setFnKey(KeyCode.RIGHT, (_, _currentInput, instance) => {
      if (instance.sourceInput === null) return
      inputCursorMove(instance.sourceInput, 1)
    })
    // set association panel keys handler
    this.setFnKey(KeyCode.ASSOCIATION, (value, _currentInput, instance) => {
      if (instance.sourceInput === null) return
      inputAppend(instance.sourceInput, value)
      instance.association.clear()
    })
    this.setFnKey(KeyCode.ASSOCIATION_PREV, (_, _currentInput, instance) => {
      instance.association.prev()
    })
    this.setFnKey(KeyCode.ASSOCIATION_NEXT, (_, _currentInput, instance) => {
      instance.association.next()
    })
    this.setFnKey(KeyCode.ASSOCIATION_INPUT, (value, _currentInput, instance) => {
      if (instance.sourceInput === null) return
      inputAppend(instance.sourceInput, value)
      instance.association.clear()
    })
    this.setFnKey(KeyCode.ASSOCIATION_CLOSE, (_, _currentInput, instance) => {
      instance.association.clear()
    })

    option.modes.forEach(mode => {
      this.modeMap.set(mode.name, mode)
      this.modeKeys.push(mode.name)
    })
    this.currentMode = option.modes[0].name
  }

  public setVisible(visible?: boolean) {
    if (visible !== undefined) {
      visible = !visible
    }
    toggleClassName(this.container, ClassName.HIDE, visible)
  }

  public setFnKey(keyCode: KeyCode, fn: FnKeyHandler) {
    this.fnMap.set(keyCode, fn)
  }

  private render() {
    // generate keys by current mode layout
    const currentMode = this.modeMap.get(this.currentMode)
    if (currentMode !== undefined) {
      this.keyboard.generateKeys(currentMode.layout, currentMode.name)
      this.association.clear()
      if (currentMode.associate !== undefined) {
        this.currentInput = this.association.getInput()
        this.association.setDictionary(currentMode.associate)
      } else {
        this.currentInput = this.sourceInput
      }
    }
  }
  private focusHandler = (event: TriggerEvent) => {
    const eventTarget = event.target
    if (isInput(eventTarget)) {
      this.sourceInput = eventTarget
      // this.currentInput = eventTarget
      this.render()
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
    if (isHTMLElement(eventTarget) && eventTarget !== this.container) {
      const keyCode = this.getKeyCode(eventTarget)
      if (keyCode === -1) return
      const fn = this.fnMap.get(keyCode)
      if (fn !== undefined) {
        fn(eventTarget.innerText, this.currentInput, this)
        return
      }
      inputAppend(this.currentInput, eventTarget.innerText)
    }
  }

  private getKeyCode(el: HTMLElement): number {
    let target = el
    do {
      const keyCodeAttr = target.getAttribute(KEY_CODE_ATTR_NAME)
      if (keyCodeAttr !== null) {
        const keyStatus = target.getAttribute(KEY_DISABLED_ATTR_NAME)
        if (keyStatus === KeyDisabledStatus.DISABLED) {
          return -1
        } else {
          return parseInt(keyCodeAttr)
        }
      }
      if (target.parentElement !== null) {
        target = target.parentElement
      }
    } while (target.className.indexOf(ClassName.KEYBOARD_CONTAINER) === -1)
    return -1
  }
}

export * from '@os-keyboard/layouts'
export * from '@os-keyboard/dictionaries'
export * from '@os-keyboard/theme'