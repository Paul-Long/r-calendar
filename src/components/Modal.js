import React from 'react';
import { prefix } from '../variable';
import { ModalProps } from '../Props';

const px = `${prefix}-modal`;

class Modal extends React.PureComponent<ModalProps> {
  render() {
    const { children, visible, saveRef } = this.props;
    return (
      <div
        className={px}
        ref={saveRef('modal')}
        style={{ display: visible ? 'inline-block' : 'none' }}
      >
        {children}
      </div>
    );
  }
}

export default Modal;
