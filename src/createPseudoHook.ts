import * as React from 'react';
import { Platform } from 'react-native';
import getNode from './getNode'

export default function createPseudoHook<T>({ events }: { events: string[] }): (ref: React.MutableRefObject<T>) => any {
  return function(ref) {
    if (
      // Pseudo classes only work in the browser
      Platform.OS !== 'web'
    ) {
      return false;
    }
  
    const [isActive, setActive] = React.useState(false);

    React.useEffect(() => {
      const [eventIn, eventOut] = events;
      const node = getNode(ref);

      const resolve = value => {
        setActive(value);
      };

      // @ts-ignore
      const onStart = resolve.bind(this, true);
      // @ts-ignore
      const onEnd = resolve.bind(this, false);

      node.addEventListener(eventIn, onStart);
      node.addEventListener(eventOut, onEnd);

      // Special case for useActive to respond when the user drags out of the view and releases.
      if (eventOut === 'mouseup') {
        document.addEventListener(eventOut, onEnd, false);
      }
      return () => {
        document.removeEventListener(eventOut, onEnd, false);
        node.removeEventListener(eventIn, onStart);
        node.removeEventListener(eventOut, onEnd);
      };
    }, [ref && ref.current]);

    return isActive
  };
}
