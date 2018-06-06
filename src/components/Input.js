import React from 'react';
import { prefix } from '../variable';
import Icon from './Icon';
import { InputProps } from '../Props';

function fixControlledValue<T>(value: T) {
  if (typeof value === 'undefined' || value === null) {
    return '';
  }
  return value;
}

class Input extends React.PureComponent<InputProps> {
  static defaultProps = {
    showIcon: true
  };
  renderIcon = () => {
    const { iconRender, showIcon } = this.props;
    if (showIcon) {
      if (typeof iconRender === 'function') {
        return iconRender();
      }
      return (<Icon type='calendar' />);
    }
  };

  render() {
    let { onClick, value, format, placeholder } = this.props;
    if (value) {
      value = value.format(format);
    }
    value = fixControlledValue(value);
    return (
      <div className={`${prefix}-input`} onClick={onClick}>
        <input type='text' readOnly value={value} placeholder={placeholder} />
        {this.renderIcon()}
      </div>
    );
  }
}

export default Input;
