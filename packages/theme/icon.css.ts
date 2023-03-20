import { globalStyle, GlobalStyleRule } from '@vanilla-extract/css'
import { IconClassName } from '@os-keyboard/constants'
import { toClassSelector } from '@os-keyboard/utils'

globalStyle(toClassSelector(IconClassName.BASE), {
  display: 'inline-block',
  width: '1em',
  height: '1em',
  position: 'relative'
})

const closeIconCommonStyle: GlobalStyleRule = {
  content: '""',
  position: 'absolute',
  width: '100%',
  height: '3px',
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

globalStyle(toClassSelector(IconClassName.PREV) + '::before', {
  content: '""',
  display: 'block',
  height: 0,
  width: 0,
  border: '0.5em solid transparent',
  borderLeftWidth: '0.25em',
  borderRightColor: '#FFFFFF'
})

globalStyle(toClassSelector(IconClassName.NEXT) + '::before', {
  content: '""',
  display: 'block',
  height: 0,
  width: 0,
  border: '0.5em solid transparent',
  borderRightWidth: '0.25em',
  borderLeftColor: '#FFFFFF'
})