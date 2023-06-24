export type KeyboardSizeToFontSize = {
  mini: string,
  small: string,
  medium: string,
  large: string
}

export type KeyboardSize = keyof KeyboardSizeToFontSize

export const keyboardSizeToFontSize: KeyboardSizeToFontSize = {
  mini: '12px',
  small: '14px',
  medium: '16px',
  large: '18px',
}