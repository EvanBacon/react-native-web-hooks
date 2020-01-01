import { MutableRefObject } from 'react';

import createPseudoHook from '../createPseudoHook';
import isHoveredEnabled from '../isHoverEnabled';

type Callback = (value: boolean) => void;

export const useActive = createPseudoHook({
  events: ['mousedown', 'mouseup'],
  props: ['onMouseDown', 'onMouseUp'],
  propName: 'isActive',
  isDisabled: () => !isHoveredEnabled(),
}) as (<T>(ref: MutableRefObject<T> | Callback) => { isActive: Boolean; onMouseDown?: Function, onMouseUp?: Function });

export const useFocus = createPseudoHook({
  events: ['focus', 'blur'],
  props: ['onFocus', 'onBlur'],
  propName: 'isFocused',
}) as (<T>(ref: MutableRefObject<T> | Callback) => { isFocused: Boolean; onFocus?: Function, onBlur?: Function });

export const useHover = createPseudoHook({
  events: ['mouseenter', 'mouseleave'],
  props: ['onMouseEnter', 'onMouseLeave'],
  propName: 'isHovered',
}) as (<T>(ref: MutableRefObject<T> | Callback) => { isHovered: Boolean; onMouseEnter?: Function, onMouseLeave?: Function });

export { default as useDimensions } from './useDimensions';
export { default as useScaledSize } from './useScaledSize';
export { default as useREM } from './useREM';
