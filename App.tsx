import * as React from 'react';
import { StyleSheet, Linking, Text as RNText, Platform, View, TextProps } from 'react-native';

import * as Pseudo from './build';


// Use class to test if the ref is bubbling
class TestContainer extends React.Component {
  render() {
    const props = this.props as any;
    return (
      <>
      <View
      {...props}
      style={[{
        backgroundColor: 'orange',
        borderColor: 'black',
        padding: 8
      }, props.style]} />
      </>
    )
  }
}

const TestText = ({ on, ...props }) => {
  return (
    <Text
    {...props}
    style={[{
      fontSize: 'bold', 
      color: on ? 'green' : 'blue' 
    }, props.style]} />
  )
}

function ActiveRefTest() {

  const ref = React.useRef(null);
  const isActive = Pseudo.useActive(ref);

  return (
    <TestContainer ref={ref}>
      <TestText on={isActive}>
        Test Active ref
      </TestText>
    </TestContainer>
  )
}

export default function App() {
  return (
    <View style={styles.container}>
      <ActiveRefTest />
      <Link>Link #1</Link>
      <Link>Link #2</Link>
      <Link>Link #3</Link>
      <Link>Link #4</Link>
      <Link>Link #5</Link>
    </View>
  );
}

const Text = RNText as any;

function Link({ children, href = '#' }) {
  const ref = React.useRef<Text>(null);

  const isHovered = Pseudo.useHover(ref);
  const isFocused = Pseudo.useFocus(ref);
  const isActive = Pseudo.useActive(ref);

  return (
    <View style={styles.container}>
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
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
