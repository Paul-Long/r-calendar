import React from 'react';
import { prefix } from '../variable';
import { ModalProps } from '../Props';

const px = `${prefix}-modal`;

class Modal extends React.PureComponent<ModalProps> {
  render() {
    const { children, visible } = this.props;
    return (
      <div className={px} style={{ display: visible ? 'inline-block' : 'none' }}>
        {children}
      </div>
    );
  }
}

export default Modal;
