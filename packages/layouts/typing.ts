import type { KeyCode } from '@os-keyboard/constants'
export interface Key {
  keyCode: KeyCode,
  lc: string,
  uc?: string,
  size?: number
}

export type Layout = Key[][]