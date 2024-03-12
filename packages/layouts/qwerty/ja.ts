import { KeyCode } from '@os-keyboard/constants'
import type { Layout } from '../typing'

const layout: Layout = [
  [
    { keyCode: KeyCode.BACKQUOTE, pri: '·', sec: '～' },
    { keyCode: KeyCode.ONE, pri: '1', sec: '！' },
    { keyCode: KeyCode.TWO, pri: '2', sec: '@' },
    { keyCode: KeyCode.THREE, pri: '3', sec: '#' },
    { keyCode: KeyCode.FOUR, pri: '4', sec: '¥' },
    { keyCode: KeyCode.FIVE,  pri: '5', sec: '%' },
    { keyCode: KeyCode.SIX, pri: '6', sec: '……' },
    { keyCode: KeyCode.SEVEN, pri: '7', sec: '&' },
    { keyCode: KeyCode.EIGHT, pri: '8', sec: '*' },
    { keyCode: KeyCode.NINE, pri: '9', sec: '（' },
    { keyCode: KeyCode.ZERO, pri: '0', sec: '）' },
    { keyCode: KeyCode.MINUS, pri: '-', sec: '——' },
    { keyCode: KeyCode.EQUAL, pri: '=', sec: '+' },
    { keyCode: KeyCode.BACKSPACE, pri: 'Backspace', size: 2 }
  ],
  [
    { keyCode: KeyCode.TAB, pri: 'Tab', size: 1.5 },
    { keyCode: KeyCode.Q, pri: 'q', sec: 'た' },
    { keyCode: KeyCode.W, pri: 'w', sec: 'て' },
    { keyCode: KeyCode.E, pri: 'e', sec: 'い' },
    { keyCode: KeyCode.R, pri: 'r', sec: 'す' },
    { keyCode: KeyCode.T, pri: 't', sec: 'か' },
    { keyCode: KeyCode.Y, pri: 'y', sec: 'ん' },
    { keyCode: KeyCode.U, pri: 'u', sec: 'な' },
    { keyCode: KeyCode.I, pri: 'i', sec: 'に' },
    { keyCode: KeyCode.O, pri: 'o', sec: 'ら' },
    { keyCode: KeyCode.P, pri: 'p', sec: 'せ' },
    { keyCode: KeyCode.LEFT_BRACKET, pri: '【', sec: '「' },
    { keyCode: KeyCode.RIGHT_BRACKET, pri: '】', sec: '」' },
    { keyCode: KeyCode.BACK_SLASH, pri: '、', sec: '｜', size: 1.5 },
  ],
  [
    { keyCode: KeyCode.CAPSLOCK, pri: 'Capslock', size: 1.8 },
    { keyCode: KeyCode.A, pri: 'a', sec: 'ち' },
    { keyCode: KeyCode.S, pri: 's', sec: 'と' },
    { keyCode: KeyCode.D, pri: 'd', sec: 'し' },
    { keyCode: KeyCode.F, pri: 'f', sec: 'は' },
    { keyCode: KeyCode.G, pri: 'g', sec: 'き' },
    { keyCode: KeyCode.H, pri: 'h', sec: 'く' },
    { keyCode: KeyCode.J, pri: 'j', sec: 'ま' },
    { keyCode: KeyCode.K, pri: 'k', sec: 'の' },
    { keyCode: KeyCode.L, pri: 'l', sec: 'り' },
    { keyCode: KeyCode.SEMICOLON,  pri: '；', sec: '：' },
    { keyCode: KeyCode.QUOTES, pri: '‘', sec: '“' },
    { keyCode: KeyCode.ENTER, pri: 'Enter', size: 2.3 }
  ],
  [
    { keyCode: KeyCode.SHIFT, pri: 'Shift', size: 2.5 },
    { keyCode: KeyCode.Z, pri: 'z', sec: 'つ' },
    { keyCode: KeyCode.X, pri: 'x', sec: 'さ' },
    { keyCode: KeyCode.C, pri: 'c', sec: 'そ' },
    { keyCode: KeyCode.V, pri: 'v', sec: 'ひ' },
    { keyCode: KeyCode.B, pri: 'b', sec: 'こ' },
    { keyCode: KeyCode.N, pri: 'n', sec: 'み' },
    { keyCode: KeyCode.M, pri: 'm', sec: 'も' },
    { keyCode: KeyCode.COMMA,  pri: '，', sec: '《' },
    { keyCode: KeyCode.DOT, pri: '。', sec: '》' },
    { keyCode: KeyCode.FORWARD_SLASH, pri: '/', sec: '？' },
    { keyCode: KeyCode.SHIFT, pri: 'Shift', size: 2.7 }
  ],
  [
    { keyCode: KeyCode.MODE, pri: '', size: 1 },
    { keyCode: KeyCode.SPACE, pri: '\xa0', size: 8 },
    { keyCode: KeyCode.LEFT, pri: '←' },
    { keyCode: KeyCode.RIGHT, pri: '→' },
    { keyCode: KeyCode.DELETE, pri: 'Delete' },
    { keyCode: KeyCode.CLOSE, pri: 'Close' }
  ]
]

export default layout