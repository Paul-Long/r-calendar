import React from 'react';
import { prefix } from '../variable';
import { ButtonProps } from '../Props';
import Icon from './Icon';

class Button extends React.PureComponent<ButtonProps> {
  handleClick = event => {
    const { onClick } = this.props;
    event.target['data-num'] = this.props['data-num'];
    event.target['data-unit'] = this.props['data-unit'];
    if (typeof onClick === 'function') {
      onClick(event);
    }
  };

  render() {
    const { double, type } = this.props;
    return (
      <div className={`${prefix}-button`} onClick={this.handleClick}>
        <Icon type={type} />
        {double && <Icon type={type} />}
      </div>
    );
  }
}

export default Button;
