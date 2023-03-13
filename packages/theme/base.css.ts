import { globalStyle } from '@vanilla-extract/css'
import { ClassName } from '@os-keyboard/constants'

function toClassSelector(className: string): string {
  return `.${className}`
}

globalStyle(toClassSelector(ClassName.KEYBOARD_CONTAINER), {
  fontSize: 16,
  padding: '0.5em',
  position: 'fixed',
  left: '50%',
  bottom: 0,
  textAlign: 'center',
  transform: 'translateX(-50%)',
  borderRadius: '0.5em',
  transition: 'all 0.25s',
  background: '#424242',
  WebkitTapHighlightColor: 'transparent',
  boxShadow: `10px 10px 30px rgba(65, 65, 65, 0.5),
              -10px -10px 30px rgba(248, 253, 255, 0.9),
              inset 10px 10px 30px transparent,
              inset -10px -10px 30px transparent`
})

globalStyle(toClassSelector(ClassName.HIDE), {
  transform: 'translateX(-50%) translateY(100%)'
})

globalStyle(
  toClassSelector(ClassName.KEYBOARD_CONTAINER) + ' ' +
  toClassSelector(ClassName.KEYBOARD_ROW),
  {
    display: 'table',
    tableLayout: 'auto',
    borderSpacing: '0.375em 0',
    marginBottom: '0.375em',
    whiteSpace: 'nowrap',
    width: '100%'
  }
)

globalStyle(
  toClassSelector(ClassName.KEYBOARD_CONTAINER) + ' ' +
  toClassSelector(ClassName.KEYBOARD_ROW) + ':last-child',
  {
    marginBottom: 0
  }
)

globalStyle(
  toClassSelector(ClassName.KEYBOARD_CONTAINER) + ' ' +
  toClassSelector(ClassName.KEYBOARD_ROW) + ' ' +
  toClassSelector(ClassName.KEYBOARD_KEY),
  {
    display: 'table-cell',
    boxSizing: 'border-box',
    verticalAlign: 'top',
    minWidth: '3.75em',
    width: '3.75em',
    padding: '0 0.375em',
    backgroundImage: 'linear-gradient(to bottom, #191919, #151515 30%, #151515)',
    color: '#c1c1c1',
    borderRadius: '0.3em',
    boxShadow: '0 0 0px 0.1em #000000',
    userSelect: 'none',
    cursor: 'pointer',
    overflow: 'hidden',
    lineHeight: '3.75em'
  }
)

globalStyle(
  toClassSelector(ClassName.KEYBOARD_CONTAINER) + ' ' +
  toClassSelector(ClassName.KEYBOARD_ROW) + ' ' +
  toClassSelector(ClassName.KEYBOARD_KEY) + ':last-child',
  {
    marginRight: 0
  }
)

globalStyle(
  toClassSelector(ClassName.KEYBOARD_CONTAINER) + ' ' +
  toClassSelector(ClassName.KEYBOARD_ROW) + ' ' +
  toClassSelector(ClassName.KEYBOARD_KEY) + ':active',
  {
    boxShadow: 'none'
  }
)