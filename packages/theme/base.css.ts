import { globalStyle as vanillaGlobalStyle, GlobalStyleRule, globalKeyframes } from '@vanilla-extract/css'
import { ClassName } from '@os-keyboard/constants'

type Selector = string | ClassName | { type: 'separator' }
function isClassName (selector: string): selector is ClassName {
  return Object.values(ClassName).includes(selector as ClassName)
}
function globalStyle(selectors: Selector[], rule: GlobalStyleRule) {
  const classSelectors = selectors.map((selector) => {
    if (typeof selector === 'string') {
      if (isClassName(selector)) {
        return `.${selector}`
      }
      return selector
    } else if ('type' in selector && selector.type === 'separator') {
      return ' '
    } else {
      return selector
    }
  })
  return vanillaGlobalStyle(classSelectors.join(''), rule)
}
const SEP = { type: 'separator' as const }

globalStyle([ClassName.KEYBOARD_CONTAINER], {
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

globalStyle([ClassName.KEYBOARD_CONTAINER, ClassName.HIDE], {
  transform: 'translateX(-50%) translateY(100%)'
})

globalStyle([ClassName.KEYBOARD_CONTAINER, SEP, ClassName.KEYBOARD_ROW], {
  display: 'table',
  tableLayout: 'auto',
  borderSpacing: '0.375em 0',
  marginBottom: '0.375em',
  whiteSpace: 'nowrap',
  width: '100%'
})

globalStyle([ClassName.KEYBOARD_CONTAINER, SEP, ClassName.KEYBOARD_ROW, ':last-child'], {
  marginBottom: 0
})

globalStyle([ClassName.KEYBOARD_CONTAINER, SEP, ClassName.KEYBOARD_ROW, SEP, ClassName.KEYBOARD_KEY], {
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
})

globalStyle([ClassName.KEYBOARD_CONTAINER, SEP, ClassName.KEYBOARD_ROW, SEP, ClassName.KEYBOARD_KEY, ':last-child'], {
  marginRight: 0
})

globalStyle([ClassName.KEYBOARD_CONTAINER, SEP, ClassName.KEYBOARD_ROW, SEP, ClassName.KEYBOARD_KEY, ':active'], {
  boxShadow: 'none'
})

globalStyle([ClassName.KEYBOARD_CONTAINER, SEP, ClassName.KEYBOARD_ROW, SEP, ClassName.KEYBOARD_KEY, ClassName.ACTIVE], {
  position: 'relative'
})
globalStyle([ClassName.KEYBOARD_CONTAINER, SEP, ClassName.KEYBOARD_ROW, SEP, ClassName.KEYBOARD_KEY, ClassName.ACTIVE, '::after'], {
  content: '""',
  position: 'absolute',
  left: '0.5em',
  top: '0.5em',
  height: '0.5em',
  width: '0.5em',
  borderRadius: '100%',
  background: '#10B981'
})

globalStyle([ClassName.KEYBOARD_CONTAINER, SEP, ClassName.KEYBOARD_ASSOCIATION], {
  height: '2.5em',
  background: '#000000',
  borderRadius: '0.3em',
  marginBottom: '0.375em',
  padding: '0 3.75em',
  transition: 'all 0.25s',
  textAlign: 'left',
  overflow: 'hidden'
})

globalStyle([ClassName.KEYBOARD_CONTAINER, SEP, ClassName.KEYBOARD_ASSOCIATION, ClassName.HIDE], {
  height: 0,
  marginBottom: 0
})

globalStyle([ClassName.KEYBOARD_CONTAINER, SEP, ClassName.KEYBOARD_ASSOCIATION, '> *'], {
  height: '1.5em',
  marginTop: '0.5em',
  marginBottom: '0.5em',
  verticalAlign: 'top',
  display: 'inline-block'
})

globalStyle([ClassName.KEYBOARD_CONTAINER, SEP, ClassName.KEYBOARD_ASSOCIATION, SEP, ClassName.ASSOCIATION_CLOSE], {
  width: '1.5em',
  borderRadius: '1.5em',
  background: '#FFFFFF',
  textAlign: 'center',
  lineHeight: '1.5em',
  marginRight: '4em',
  cursor: 'pointer',
  position: 'relative'
})

globalStyle([ClassName.KEYBOARD_CONTAINER, SEP, ClassName.KEYBOARD_ASSOCIATION, SEP, ClassName.ASSOCIATION_CLOSE, '> *'], {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)'
})

globalStyle([ClassName.KEYBOARD_CONTAINER, SEP, ClassName.KEYBOARD_ASSOCIATION, SEP, ClassName.ASSOCIATION_INPUT], {
  display: 'none'
})

globalStyle([ClassName.KEYBOARD_CONTAINER, SEP, ClassName.KEYBOARD_ASSOCIATION, SEP, ClassName.ASSOCIATION_TEXT_BOX], {
  color: '#FFFFFF',
  width: '10em',
  padding: '0 1em',
  cursor: 'pointer',
  height: '1.5em',
  lineHeight: '1.5em',
  fontSize: 'inherit',
  borderRadius: '0.5em',
  letterSpacing: '0.1em',
  background: 'rgba(255, 255, 255, 0.2)',
  verticalAlign: 'middle'
})
const CURSOR_BLINK = 'os-keyboard-cursor-blink'
globalKeyframes(CURSOR_BLINK, {
  '0%': { opacity: 1 },
  '50%': { opacity: 0 },
  '100%': { opacity: 1 }
})
globalStyle([ClassName.KEYBOARD_CONTAINER, SEP, ClassName.KEYBOARD_ASSOCIATION, SEP, ClassName.ASSOCIATION_TEXT_BOX, '::after'], {
  content: '\u007C',
  display: 'inline-block',
  animation: `1s infinite ease-out ${CURSOR_BLINK}`
})

globalStyle([ClassName.KEYBOARD_CONTAINER, SEP, ClassName.KEYBOARD_ASSOCIATION, SEP, ClassName.ASSOCIATION_CANDIDATE_LIST], {
  width: '35em',
  margin: 0,
  height: '2em',
  marginTop: '0.25em',
  marginBottom: '0.25em',
  float: 'right',
  textAlign: 'right'
})

globalStyle([ClassName.KEYBOARD_CONTAINER, SEP, ClassName.KEYBOARD_ASSOCIATION, SEP, ClassName.ASSOCIATION_CANDIDATE_OPTION], {
  display: 'inline-block',
  lineHeight: '2em',
  verticalAlign: 'top',
  height: '100%',
  color: '#FFFFFF',
  padding: '0 0.5em',
  margin: '0 0.25em',
  borderRadius: '0.5em',
  cursor: 'pointer',
  position: 'relative',
})

globalStyle([ClassName.KEYBOARD_CONTAINER, SEP, ClassName.KEYBOARD_ASSOCIATION, SEP, ClassName.ASSOCIATION_CANDIDATE_OPTION, ':hover'], {
  background: '#555555'
})

globalStyle([ClassName.KEYBOARD_CONTAINER, SEP, ClassName.KEYBOARD_ASSOCIATION, SEP, ClassName.ASSOCIATION_CANDIDATE_OPTION, ClassName.DISABLED], {
  opacity: 0.5,
  background: 'transparent !important',
  cursor: 'not-allowed'
})

globalStyle([ClassName.KEYBOARD_CONTAINER, SEP, ClassName.KEYBOARD_ASSOCIATION, SEP, ClassName.ASSOCIATION_CANDIDATE_OPTION, '> *'], {
  marginTop: '0.5em',
})