import React from 'react';
import { prefix } from '../variable';

class Input extends React.PureComponent {
  render() {
    return (
      <div className={`${prefix}-input`} onClick={this.props.onClick}>
        <input type='text' readOnly={true} onFocus={this.handleFocus} />
      </div>
    );
  }
}

export default Input;
