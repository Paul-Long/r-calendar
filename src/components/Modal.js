import React from 'react';
import { prefix } from '../variable';
import { ModalProps } from '../Props';

const px = `${prefix}-modal`;

class Modal extends React.PureComponent<ModalProps> {
  handleClick = (event) => {
    event.stopPropagation();
    const { onClick } = this.props;
    if (typeof onClick === 'function') {
      onClick(!this.props.visible);
    }
  };

  render() {
    const { children, visible } = this.props;
    return (
      <div className={px} style={{ display: visible ? 'inline-block' : 'none' }}>
        <div className={`${px}-mask`} onClick={this.handleClick} />
        {children}
      </div>
    );
  }
}

export default Modal;
