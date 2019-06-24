// By @necolas:
// https://github.com/necolas/react-native-web/blob/master/docs/guides/web-recipes.md
import { element, func, oneOfType } from 'prop-types';
import * as React from 'react';

import isHoverEnabled from './isHoverEnabled';

export default class Hoverable extends React.Component {
  static displayName = 'Hoverable';
  static propTypes = {
    children: oneOfType([func, element]),
    onHoverIn: func,
    onHoverOut: func,
  };

  state = { isHovered: false, showHover: true };

  _handleMouseEnter = e => {
    if (isHoverEnabled() && !this.state.isHovered) {
      const { onHoverIn } = this.props;
      if (onHoverIn) onHoverIn();
      this.setState(state => ({ ...state, isHovered: true }));
    }
  };

  _handleMouseLeave = e => {
    if (this.state.isHovered) {
      const { onHoverOut } = this.props;
      if (onHoverOut) onHoverOut();
      this.setState(state => ({ ...state, isHovered: false }));
    }
  };

  _handleGrant = () => {
    this.setState(state => ({ ...state, showHover: false }));
  };

  _handleRelease = () => {
    this.setState(state => ({ ...state, showHover: true }));
  };

  render() {
    const { children } = this.props;
    const child =
      typeof children === 'function'
        ? children(this.state.showHover && this.state.isHovered)
        : children;

    return React.cloneElement(React.Children.only(child), {
      onMouseEnter: this._handleMouseEnter,
      onMouseLeave: this._handleMouseLeave,
      // prevent hover showing while responder
      onResponderGrant: this._handleGrant,
      onResponderRelease: this._handleRelease,
      // if child is Touchable
      onPressIn: this._handleGrant,
      onPressOut: this._handleRelease,
    });
  }
}
