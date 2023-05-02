import { Input } from './types'

export function toggleClassName(element: HTMLElement, token: string, force?: boolean) {
  if (token === '') return
  const classList = element.className.split(' ')

  let exist = false
  for (let i = 0; i < classList.length; i++) {
    if (classList[i] === token) {
      exist = true
      if (force !== true) {
        classList.splice(i, 1)
        break
      }
    }
  }
  if (exist === false && force !== false) {
    classList.push(token)
  }
  element.className = classList.join(' ')
}

export function toClassSelector(className: string) {
  return '.' + className.split(' ').join('.')
}

export function inputAppend(input: Input, value: string): string {
  const selectionStart = input.selectionStart || 0
  const selectionEnd = input.selectionEnd || 0
  const selectLength = selectionEnd - selectionStart
  const oldValue = input.value
  const partOneEnd = selectLength ? selectionStart : selectionStart
  const newValue = oldValue.slice(0, partOneEnd) + value + oldValue.slice(selectionEnd)
  dispatchInput(input, newValue)
  input.selectionStart = input.selectionEnd = selectionStart + value.length
  return input.value
}

export function inputBackspace(input: Input): string {
  const selectionStart = input.selectionStart || 0
  const selectionEnd = input.selectionEnd || 0
  const selectLength = selectionEnd - selectionStart
  const oldValue = input.value
  const partOneEnd = selectLength ? selectionStart : selectionStart - 1
  const newValue = oldValue.slice(0, partOneEnd < 0 ? 0 : partOneEnd) + oldValue.slice(selectionEnd)
  dispatchInput(input, newValue)
  input.selectionStart = input.selectionEnd = partOneEnd
  return input.value
}

export function inputDelete(input: Input): string {
  const selectionStart = input.selectionStart || 0
  const selectionEnd = input.selectionEnd || 0
  const partOneEnd = selectionStart
  const oldValue = input.value
  const newValue = oldValue.slice(0, partOneEnd < 0 ? 0 : partOneEnd) + oldValue.slice(selectionEnd + 1)
  dispatchInput(input, newValue)
  input.selectionStart = input.selectionEnd = partOneEnd
  return input.value
}

export function inputEnter(input: Input) {
  const keyboardEvent = new KeyboardEvent('keydown', {
    code: 'KeyEnter', key: 'Enter', keyCode: 13, charCode: 13
  })
  console.log(input)
  document.dispatchEvent(keyboardEvent)
}

export function dispatchInput(input: Input, value: string) {
  const inputEvent = new Event('input', { bubbles: true })
  input.value = value
  // if (inputEvent.simulated !== undefined) {
  // }
  // input._value
  input.dispatchEvent(inputEvent)
}