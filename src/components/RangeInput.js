import React from 'react';
import { prefix } from '../variable';
import Input from './Input';

class RangeInput extends React.PureComponent {
  render() {
    return (
      <div className={`${prefix}-input-range`} {...this.props}>
        <Input />
        ~
        <Input />
      </div>
    );
  }
}

export default RangeInput;
