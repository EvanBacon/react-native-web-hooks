import { MutableRefObject } from 'react';

import createPseudoHook from '../createPseudoHook';

export const useActive = createPseudoHook({
  events: ['mousedown', 'mouseup'],
}) as (<T>(ref: MutableRefObject<T>) => boolean)

export const useFocus = createPseudoHook({
  events: ['focus', 'blur'],
}) as (<T>(ref: MutableRefObject<T>) => boolean)

export const useHover = createPseudoHook({
  events: ['mouseenter', 'mouseleave'],
}) as (<T>(ref: MutableRefObject<T>) => boolean)

export { default as useDimensions } from './useDimensions';
export { default as useScaledSize } from './useScaledSize';
export { default as useLayout } from './useLayout';
export { default as useREM } from './useREM';
