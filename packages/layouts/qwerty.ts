import { KeyCode } from '@os-keyboard/constants'
import type { Layout } from './typing'
export const qwertyLayout: Layout = [
  [
    { keyCode: KeyCode.BACKQUOTE, lc: '`', uc: '~' },
    { keyCode: KeyCode.ONE, lc: '1', uc: '!' },
    { keyCode: KeyCode.TWO, lc: '2', uc: '@' },
    { keyCode: KeyCode.THREE, lc: '3', uc: '#' },
    { keyCode: KeyCode.FOUR, lc: '4', uc: '$' },
    { keyCode: KeyCode.FIVE,  lc: '5', uc: '%' },
    { keyCode: KeyCode.SIX, lc: '6', uc: '^' },
    { keyCode: KeyCode.SEVEN, lc: '7', uc: '&' },
    { keyCode: KeyCode.EIGHT, lc: '8', uc: '*' },
    { keyCode: KeyCode.NINE, lc: '9', uc: '(' },
    { keyCode: KeyCode.ZERO, lc: '0', uc: ')' },
    { keyCode: KeyCode.MINUS, lc: '-', uc: '_' },
    { keyCode: KeyCode.EQUAL, lc: '=', uc: '+' },
    { keyCode: KeyCode.BACKSPACE, lc: 'Backspace', size: 2 }
  ],
  [
    { keyCode: KeyCode.TAB, lc: 'Tab', size: 1.5 },
    { keyCode: KeyCode.Q, lc: 'q' },
    { keyCode: KeyCode.W, lc: 'w' },
    { keyCode: KeyCode.E, lc: 'e' },
    { keyCode: KeyCode.R, lc: 'r' },
    { keyCode: KeyCode.T, lc: 't' },
    { keyCode: KeyCode.Y, lc: 'y' },
    { keyCode: KeyCode.U, lc: 'u' },
    { keyCode: KeyCode.I, lc: 'i' },
    { keyCode: KeyCode.O, lc: 'o' },
    { keyCode: KeyCode.P, lc: 'p' },
    { keyCode: KeyCode.LEFT_BRACKET, lc: '[', uc: '{' },
    { keyCode: KeyCode.RIGHT_BRACKET, lc: ']', uc: '}' },
    { keyCode: KeyCode.BACK_SLASH, lc: '\\', uc: '|', size: 1.5 },
  ],
  [
    { keyCode: KeyCode.CAPSLOCK, lc: 'Capslock', size: 1.8 },
    { keyCode: KeyCode.A, lc: 'a' },
    { keyCode: KeyCode.S, lc: 's' },
    { keyCode: KeyCode.D, lc: 'd' },
    { keyCode: KeyCode.F, lc: 'f' },
    { keyCode: KeyCode.G, lc: 'g' },
    { keyCode: KeyCode.H, lc: 'h' },
    { keyCode: KeyCode.J, lc: 'j' },
    { keyCode: KeyCode.K, lc: 'k' },
    { keyCode: KeyCode.L, lc: 'l' },
    { keyCode: KeyCode.SEMICOLON,  lc: ';', uc: ':' },
    { keyCode: KeyCode.QUOTES, lc: '\'', uc: '"' },
    { keyCode: KeyCode.ENTER, lc: 'Enter', size: 2.3 }
  ],
  [
    { keyCode: KeyCode.SHIFT, lc: 'Shift', size: 2.5 },
    { keyCode: KeyCode.Z, lc: 'z' },
    { keyCode: KeyCode.X, lc: 'x' },
    { keyCode: KeyCode.C, lc: 'c' },
    { keyCode: KeyCode.V, lc: 'v' },
    { keyCode: KeyCode.B, lc: 'b' },
    { keyCode: KeyCode.N, lc: 'n' },
    { keyCode: KeyCode.M, lc: 'm' },
    { keyCode: KeyCode.COMMA,  lc: ',', uc: '<' },
    { keyCode: KeyCode.DOT, lc: '.', uc: '>' },
    { keyCode: KeyCode.FORWARD_SLASH, lc: '/', uc: '?' },
    { keyCode: KeyCode.SHIFT, lc: 'Shift', size: 2.7 }
  ],
  [
    { keyCode: KeyCode.MODE, lc: '', size: 1 },
    { keyCode: KeyCode.SPACE, lc: '\xa0', size: 8 },
    { keyCode: KeyCode.LEFT, lc: '←' },
    { keyCode: KeyCode.RIGHT, lc: '→' },
    { keyCode: KeyCode.DELETE, lc: 'Delete' },
    { keyCode: KeyCode.CLOSE, lc: 'Close' },
    //
  ]
]