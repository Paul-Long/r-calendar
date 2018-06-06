import React from 'react';
import { prefix } from '../variable';
import Input from './Input';
import Icon from './Icon';
import { RangeInputProps } from '../Props';

class RangeInput extends React.PureComponent<RangeInputProps> {
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
    const { value, placeholder, format, onClick } = this.props;
    const [start, end] = value || [];
    const [ps, pe] = placeholder || [];
    return (
      <div className={`${prefix}-input-range`} onClick={onClick}>
        <Input placeholder={ps || '开始时间'} value={start} format={format} showIcon={false} />
        ~
        <Input placeholder={pe || '结束时间'} value={end} format={format} showIcon={false} />
        {this.renderIcon()}
      </div>
    );
  }
}

export default RangeInput;
