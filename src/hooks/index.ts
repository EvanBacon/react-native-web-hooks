import createPseudoHook from '../createPseudoHook';
import isHoveredEnabled from '../isHoverEnabled';

export const useActive = createPseudoHook({
  events: ['mousedown', 'mouseup'],
  props: ['onMouseDown', 'onMouseUp'],
  propName: 'isActive',
  isDisabled: () => !isHoveredEnabled(),
}) as (<T>(ref: React.RefObject<T>) => { isActive: Boolean }) | ((callback: (isActive: boolean) => void) => { onMouseDown: Function, onMouseUp: Function });

export const useFocus = createPseudoHook({
  events: ['focus', 'blur'],
  props: ['onFocus', 'onBlur'],
  propName: 'isFocused',
}) as (<T>(ref: React.RefObject<T>) => { isFocused: Boolean }) | ((callback: (isFocused: boolean) => void) => { onFocus: Function, onBlur: Function });

export const useHover = createPseudoHook({
  events: ['mouseenter', 'mouseleave'],
  props: ['onMouseEnter', 'onMouseLeave'],
  propName: 'isHovered',
}) as (<T>(ref: React.RefObject<T>) => { isHovered: Boolean }) | ((callback: (isHovered: boolean) => void) => { onMouseEnter: Function, onMouseLeave: Function });

export { default as useDimensions } from './useDimensions';
export { default as useScaledSize } from './useScaledSize';
export { default as useREM } from './useREM';
