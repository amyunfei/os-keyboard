export enum MouseTrigger { FOCUS = 'click', INPUT = 'mousedown' }
export enum TouchTrigger { FOCUS = 'touchend', INPUT = 'touchstart' }

export type FocusTrigger = MouseTrigger.FOCUS | TouchTrigger.FOCUS
export type InputTrigger = MouseTrigger.INPUT | TouchTrigger.INPUT
export type TriggerEvent = GlobalEventHandlersEventMap[TouchTrigger | MouseTrigger]