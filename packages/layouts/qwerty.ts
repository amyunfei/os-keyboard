import { KeyCode } from '@os-keyboard/constants'
import type { Layout } from './typing'
export const qwertyLayout: Layout = [
  [
    { keyCode: KeyCode.BACKQUOTE, pri: '`', sec: '~' },
    { keyCode: KeyCode.ONE, pri: '1', sec: '!' },
    { keyCode: KeyCode.TWO, pri: '2', sec: '@' },
    { keyCode: KeyCode.THREE, pri: '3', sec: '#' },
    { keyCode: KeyCode.FOUR, pri: '4', sec: '$' },
    { keyCode: KeyCode.FIVE,  pri: '5', sec: '%' },
    { keyCode: KeyCode.SIX, pri: '6', sec: '^' },
    { keyCode: KeyCode.SEVEN, pri: '7', sec: '&' },
    { keyCode: KeyCode.EIGHT, pri: '8', sec: '*' },
    { keyCode: KeyCode.NINE, pri: '9', sec: '(' },
    { keyCode: KeyCode.ZERO, pri: '0', sec: ')' },
    { keyCode: KeyCode.MINUS, pri: '-', sec: '_' },
    { keyCode: KeyCode.EQUAL, pri: '=', sec: '+' },
    { keyCode: KeyCode.BACKSPACE, pri: 'Backspace', size: 2 }
  ],
  [
    { keyCode: KeyCode.TAB, pri: 'Tab', size: 1.5 },
    { keyCode: KeyCode.Q, pri: 'q' },
    { keyCode: KeyCode.W, pri: 'w' },
    { keyCode: KeyCode.E, pri: 'e' },
    { keyCode: KeyCode.R, pri: 'r' },
    { keyCode: KeyCode.T, pri: 't' },
    { keyCode: KeyCode.Y, pri: 'y' },
    { keyCode: KeyCode.U, pri: 'u' },
    { keyCode: KeyCode.I, pri: 'i' },
    { keyCode: KeyCode.O, pri: 'o' },
    { keyCode: KeyCode.P, pri: 'p' },
    { keyCode: KeyCode.LEFT_BRACKET, pri: '[', sec: '{' },
    { keyCode: KeyCode.RIGHT_BRACKET, pri: ']', sec: '}' },
    { keyCode: KeyCode.BACK_SLASH, pri: '\\', sec: '|', size: 1.5 },
  ],
  [
    { keyCode: KeyCode.CAPSLOCK, pri: 'Capslock', size: 1.8 },
    { keyCode: KeyCode.A, pri: 'a' },
    { keyCode: KeyCode.S, pri: 's' },
    { keyCode: KeyCode.D, pri: 'd' },
    { keyCode: KeyCode.F, pri: 'f' },
    { keyCode: KeyCode.G, pri: 'g' },
    { keyCode: KeyCode.H, pri: 'h' },
    { keyCode: KeyCode.J, pri: 'j' },
    { keyCode: KeyCode.K, pri: 'k' },
    { keyCode: KeyCode.L, pri: 'l' },
    { keyCode: KeyCode.SEMICOLON,  pri: ';', sec: ':' },
    { keyCode: KeyCode.QUOTES, pri: '\'', sec: '"' },
    { keyCode: KeyCode.ENTER, pri: 'Enter', size: 2.3 }
  ],
  [
    { keyCode: KeyCode.SHIFT, pri: 'Shift', size: 2.5 },
    { keyCode: KeyCode.Z, pri: 'z' },
    { keyCode: KeyCode.X, pri: 'x' },
    { keyCode: KeyCode.C, pri: 'c' },
    { keyCode: KeyCode.V, pri: 'v' },
    { keyCode: KeyCode.B, pri: 'b' },
    { keyCode: KeyCode.N, pri: 'n' },
    { keyCode: KeyCode.M, pri: 'm' },
    { keyCode: KeyCode.COMMA,  pri: ',', sec: '<' },
    { keyCode: KeyCode.DOT, pri: '.', sec: '>' },
    { keyCode: KeyCode.FORWARD_SLASH, pri: '/', sec: '?' },
    { keyCode: KeyCode.SHIFT, pri: 'Shift', size: 2.7 }
  ],
  [
    { keyCode: KeyCode.MODE, pri: '', size: 1 },
    { keyCode: KeyCode.SPACE, pri: '\xa0', size: 8 },
    { keyCode: KeyCode.LEFT, pri: '←' },
    { keyCode: KeyCode.RIGHT, pri: '→' },
    { keyCode: KeyCode.DELETE, pri: 'Delete' },
    { keyCode: KeyCode.CLOSE, pri: 'Close' },
    //
  ]
]