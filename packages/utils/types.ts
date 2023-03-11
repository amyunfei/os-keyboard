export function isTouchScreen(): boolean {
  return 'ontouchstart' in document.documentElement || navigator.maxTouchPoints > 0
}

export type Input = HTMLInputElement | HTMLTextAreaElement
export function isInput(eventTarget: EventTarget | null): eventTarget is Input {
  if (eventTarget === null) {
    return false
  } else {
    return (
      (
        eventTarget instanceof HTMLInputElement &&
        (eventTarget.type === 'text' || eventTarget.type === 'password')
      ) ||
      eventTarget instanceof HTMLTextAreaElement
    )
  }
}

export function isHTMLElement(eventTarget: EventTarget | null): eventTarget is HTMLElement {
  if (eventTarget === null) {
    return false
  }
  return eventTarget instanceof HTMLElement
}