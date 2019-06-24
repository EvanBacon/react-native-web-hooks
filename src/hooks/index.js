import createPseudoHook from '../createPseudoHook';

export const useActive = createPseudoHook({
  events: ['mousedown', 'mouseup'],
  props: ['onMouseDown', 'onMouseUp'],
  propName: 'isActive',
});

export const useFocus = createPseudoHook({
  events: ['focus', 'blur'],
  props: ['onFocus', 'onBlur'],
  propName: 'isFocused',
});

export const useHover = createPseudoHook({
  events: ['mouseenter', 'mouseleave'],
  props: ['onMouseEnter', 'onMouseLeave'],
  propName: 'isHovered',
});

export { default as useDimensions } from './useDimensions';
export { default as useScaledSize } from './useScaledSize';
export { default as useREM } from './useREM';
