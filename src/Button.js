import React from 'react';
import { prefix } from './variable';
import { ButtonProps } from './Props';

class Button extends React.PureComponent<ButtonProps> {

  handleClick = () => {
    const { onClick } = this.props;
    if (typeof onClick === 'function') {
      onClick();
    }
  };

  renderIcon = () => {
    const { type } = this.props;
    return (<div className={`icon-${type}`} />);
  };

  render() {
    const { double } = this.props;
    return (
      <div className={`${prefix}-button`} onClick={this.handleClick}>
        {this.renderIcon()}
        {double && this.renderIcon()}
      </div>
    );
  }
}

export default Button;
