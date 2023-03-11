export const keyboardSize = ['mini', 'small', 'medium', 'large'] as const
export type KeyboardSize = typeof keyboardSize[number]