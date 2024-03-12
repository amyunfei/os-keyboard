import { describe, it, expect } from 'vitest'
import { toClassSelector, toggleClassName, inputCursorMove } from '../dom'

/** @vitest-environment jsdom */
describe('Test toggleClassName', () => {
  const CLASS_NAME = 'test-name'
  function getEl() {
    return document.createElement('div')
  }
  it('should add the class name if it does not exist and force is not true', () => {
    const el = getEl()
    toggleClassName(el, CLASS_NAME)
    expect(el.className).toBe(CLASS_NAME)
  })
  it('should not add the class name if it not exists and force is false', () => {
    const el = getEl()
    toggleClassName(el, CLASS_NAME, false)
    expect(el.className).toBe('')
  })
  it('should remove the class name if it exist and force is not true', () => {
    const el = getEl()
    el.className = CLASS_NAME
    toggleClassName(el, CLASS_NAME)
    expect(el.className).toBe('')
  })
  it('should not remove the class name if force is true', () => {
    const el = getEl()
    el.className = CLASS_NAME
    toggleClassName(el, CLASS_NAME, true)
    expect(el.className).toBe(CLASS_NAME)
  })
})

describe('Test toClassSelector', () => {
  const CLASS_NAME_1 = 'test-name-1'
  const CLASS_NAME_2 = 'test-name-2'
  const CLASS_NAME_3 = 'test-name-3'
  it('single class name', () => {
    expect(toClassSelector(CLASS_NAME_1)).toBe(`.${CLASS_NAME_1}`)
  })
  it('multiple class name', () => {
    expect(toClassSelector(`${CLASS_NAME_1} ${CLASS_NAME_2} ${CLASS_NAME_3}`))
      .toBe(`.${CLASS_NAME_1}.${CLASS_NAME_2}.${CLASS_NAME_3}`)
  })
  it('multiple space between class name', () => {
    expect(toClassSelector(`${CLASS_NAME_1}    ${CLASS_NAME_2}  ${CLASS_NAME_3}`))
      .toBe(`.${CLASS_NAME_1}.${CLASS_NAME_2}.${CLASS_NAME_3}`)
  })
})

describe('Test inputCursorMove', () => {
  const INPUT_VALUE = 'test'

  it('should move the cursor to current position + 1, when offset is middle of the input', () => {
    const input = document.createElement('input')
    const defaultPos = 1
    input.value = INPUT_VALUE
    input.selectionStart = input.selectionEnd = defaultPos
    inputCursorMove(input, 1)
    expect(input.selectionStart).toBe(defaultPos + 1)
  })
  it('should move the cursor to current position - 1, when offset is middle of the input', () => {
    const input = document.createElement('input')
    const defaultPos = 1
    input.value = INPUT_VALUE
    input.selectionStart = input.selectionEnd = defaultPos
    inputCursorMove(input, -1)
    expect(input.selectionStart).toBe(defaultPos - 1)
  })
  it('should move the cursor from default position to the end, when offset is positive and out of range', () => {
    const input = document.createElement('input')
    input.value = INPUT_VALUE
    inputCursorMove(input, INPUT_VALUE.length + 1)
    expect(input.selectionStart).toBe(INPUT_VALUE.length)
  })
  it('should move the cursor from default position to the start, when offset is negative and out of range', () => {
    const input = document.createElement('input')
    input.value = INPUT_VALUE
    input.selectionStart = input.selectionEnd = 0
    inputCursorMove(input, -1)
    expect(input.selectionStart).toBe(0)
  })
})