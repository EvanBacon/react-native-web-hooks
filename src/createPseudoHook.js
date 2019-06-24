import * as React from 'react';
import { Platform } from 'react-native';
import getNode from './getNode';
import isHoverEnabled from './isHoverEnabled';
import { canUseDOM } from 'fbjs/lib/ExecutionEnvironment';

export default function createPseudoHook({ events, props, propName, isDisabled }) {
  return function(ref, callback) {
    if (
      // Pseudo classes only work in the browser
      Platform.OS !== 'web' ||
      // Account for SSR :rolls_eyes:
      !canUseDOM
    ) {
      return { [propName]: false, bind: {} };
    }

    let inputRef = ref;
    let inputCallback = callback;
    // Support for multi-configuration
    if (typeof ref === 'function') {
      inputRef = null;
      inputCallback = ref;
    }

    const [isActive, setActive] = React.useState(false);
    const [bind, setBindings] = React.useState({});

    React.useEffect(() => {
      if (isDisabled && isDisabled()) {
        return;
      }
      const node = getNode(inputRef);

      const resolve = value => {
        if (inputCallback) {
          inputCallback(value);
        }
        setActive(value);
      };

      if (!(node && typeof node.addEventListener === 'function')) {
        setBindings({
          [props[0]]: resolve.bind(this, true),
          [props[1]]: resolve.bind(this, false),
        });
        return;
      }
      setBindings({});

      const onStart = resolve.bind(this, true);
      const onEnd = resolve.bind(this, false);

      node.addEventListener(events[0], onStart);
      node.addEventListener(events[1], onEnd);

      if (events[1] === 'mouseup') {
        document.addEventListener(events[1], onEnd, false);
      }
      return () => {
        document.removeEventListener(events[1], onEnd, false);
        if (!node) return;
        node.removeEventListener(events[0], onStart);
        node.removeEventListener(events[1], onEnd);
      };
    }, [inputRef && inputRef.current]);

    return {
      [propName]: isActive,
      bind,
    };
  };
}
