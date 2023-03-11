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

export function inputAppend(input: HTMLInputElement | HTMLTextAreaElement, value: string): string {
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

export function dispatchInput(input: HTMLInputElement | HTMLTextAreaElement, value: string) {
  const inputEvent = new Event('input', { bubbles: true })
  input.value = value
  // if (inputEvent.simulated !== undefined) {
  // }
  // input._value
  input.dispatchEvent(inputEvent)
}