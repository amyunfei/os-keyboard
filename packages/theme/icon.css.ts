import { globalStyle, GlobalStyleRule } from '@vanilla-extract/css'
import { IconClassName } from '@os-keyboard/constants'
import { toClassSelector } from '@os-keyboard/utils'

globalStyle(toClassSelector(IconClassName.CLOSE), {
  display: 'inline-block',
  width: '1em',
  height: '1em',
  position: 'relative'
})

const closeIconCommonStyle: GlobalStyleRule = {
  content: '""',
  position: 'absolute',
  width: '100%',
  height: '4px',
  left: '50%',
  top: '50%',
  borderRadius: '2px',
  background: '#000000'
}
globalStyle(toClassSelector(IconClassName.CLOSE) + '::before', {
  ...closeIconCommonStyle,
  transform: 'translate(-50%, -50%) rotate(45deg)',
})
globalStyle(toClassSelector(IconClassName.CLOSE) + '::after', {
  ...closeIconCommonStyle,
  transform: 'translate(-50%, -50%) rotate(-45deg)'
})