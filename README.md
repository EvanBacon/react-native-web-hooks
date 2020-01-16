# react-native-web-hooks

Hooks for implementing complex functionality in React Native for web and Expo.

A closer look at [how the hooks work here](https://gist.github.com/EvanBacon/8739dc52a4dbb72e869f19b1e5cdda6c).

## Installation

```bash
yarn add react-native-web-hooks

or

npm install --save react-native-web-hooks
```

### Usage - Hooks

Import the library into your JavaScript file:

```js
import {
  useDimensions,
  useActive,
  useFocus,
  useHover,
  useREM,
  useScaledSize,
} from 'react-native-web-hooks';
```

#### Get REM size

Use these in place of rem font sizes like: `font-size: 1.3rem`.

> Note: this isn't a hook anymore and will be moved out in the future.

```jsx
const fontSize = useREM(1.3);

return <Text style={{ fontSize }} />;
```

#### Get scaled font size

These change based on the width of the screen.

```jsx
const fontSize = useScaledSize(1.5);

return <Text style={{ fontSize }} />;
```

#### Get dimensions

Note that `fontScale` is hard-coded to `1` on the `react-native-web` side and shouldn't be used to calculate dynamic font sizes.

```jsx
const {
  window: { width, height, fontScale, scale },
  screen,
} = useDimensions();
```

#### Measure a view

It's best to style a view based on that own view's size and not the window size. To make this easier you can use the `useLayout` hook!

> 🚨 Using `onLayout` may require you to install `resize-observer-polyfill`. Learn more in [the official Expo docs](https://docs.expo.io/versions/latest/guides/customizing-webpack/#resizeobserver)

```jsx
const {
  onLayout,
  width,
  height,
  x,
  y
} = useLayout();

return <View onLayout={onLayout} />
```

#### Create pseudo class styles

These will be replaced by **React Flare** when it's released.

```jsx
import { useRef } from 'react';
import { StyleSheet, Linking, Text, Platform } from 'react-native';

import { useHover, useFocus, useActive } from 'react-native-web-hooks';

function Link({ children, href = '#' }) {
  const ref = useRef(null);

  const isHovered = useHover(ref);
  const isFocused = useFocus(ref);
  const isActive = useActive(ref);

  return (
    <Text
      accessibilityRole="link"
      href={href}
      draggable={false}
      onPress={() => Linking.openURL(href)}
      tabIndex={0}
      ref={ref}
      style={[
        styles.text,
        isHovered && styles.hover,
        isFocused && styles.focused,
        isActive && styles.active,
      ]}>
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  text: {
    ...Platform.select({
      web: {
        cursor: 'pointer',
        outlineStyle: 'none',
        borderBottomWidth: 1,
        borderBottomColor: 'transparent',
        transitionDuration: '200ms',
      },
      default: {},
    }),
  },
  active: {
    color: 'blue',
    borderBottomColor: 'blue',
    opacity: 1.0,
  },
  hover: {
    opacity: 0.6,
  },
  focused: {
    borderBottomColor: 'black',
  },
});
```

### Usage - Render Props

Import the library into your JavaScript file:

```js
import { Hoverable, Resizable } from 'react-native-web-hooks';
```

You can wrap a function or a component.

```tsx
import React, { Component } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { Hoverable } from 'react-native-web-hooks';

const createLogger = (...msg) => () => {
  console.log(...msg);
};

class App extends Component {
  render() {
    return (
      <View>
        <Hoverable onHoverIn={createLogger('start hover')} onHoverOut={createLogger('end hover')}>
          {isHovered => (
            <TouchableOpacity accessible style={{ backgroundColor: isHovered ? '#333' : '#fff' }}>
              <Text>Welcome to React</Text>}
            </TouchableOpacity>
          )}
        </Hoverable>
      </View>
    );
  }
}
```

Observe window resize events.

```tsx
return (
  <Resizable>
    {layout => <View style={{ width: layout.width / 2, height: layout.width / 2 }} />}
  </Resizable>
);
```
