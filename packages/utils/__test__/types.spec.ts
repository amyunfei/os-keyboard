import { describe, it, expect } from 'vitest'
import { isTouchScreen } from '../types'

/** @vitest-environment jsdom */
describe('Test isTouchScreen', () => {
  it('should return true when the device is touch screen', () => {
    expect(isTouchScreen()).toBe(true)
  })
})