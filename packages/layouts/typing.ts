import type { KeyCode } from '@os-keyboard/constants'
export interface Key {
  keyCode: KeyCode,
  lc: string,
  uc?: string,
  size?: number
}

export interface Layout {
  name: string,
  keys: Key[][]
}