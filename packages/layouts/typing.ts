import type { KeyCode } from '@os-keyboard/constants'
export interface Key {
  keyCode: KeyCode,
  pri: string,
  sec?: string,
  tert?: string,
  size?: number
}

export type Layout = Key[][]