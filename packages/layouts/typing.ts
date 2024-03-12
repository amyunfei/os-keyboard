import type { KeyCode } from '@os-keyboard/constants'
export interface Key {
  keyCode: KeyCode,
  /** primary */
  pri: string,
  /** secondary */
  sec?: string,
  /** tertiary */
  tert?: string,
  size?: number
}

export type Layout = Key[][]