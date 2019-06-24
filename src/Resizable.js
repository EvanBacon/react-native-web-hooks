import * as React from 'react';
import { element, func, oneOfType, oneOf } from 'prop-types';
import { Dimensions } from 'react-native';

export default class Resizable extends React.Component {
  static displayName = 'Resizable';

  static propTypes = {
    children: oneOfType([func, element]),
    target: oneOf(['window', 'screen']),
  };

  static defaultProps = {
    target: 'window',
  };

  constructor(props) {
    super(props);

    this.state = {
      ...Dimensions.get(props.target),
    };
  }

  componentDidMount() {
    Dimensions.addEventListener('change', this.resize);
  }

  componentWillUnmount() {
    Dimensions.removeEventListener('change', this.resize);
  }

  resize = props => {
    const { [this.props.target]: target = {} } = props;
    this.setState(state => ({ ...state, ...target }));
  };

  render() {
    const { children } = this.props;
    const child = typeof children === 'function' ? children(this.state) : children;

    return React.cloneElement(React.Children.only(child), {});
  }
}
