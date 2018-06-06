import React from 'react';
import { findDOMNode } from 'react-dom';
import { prefix } from '../variable';
import { ModalProps } from '../Props';

const px = `${prefix}-modal`;

class Modal extends React.PureComponent<ModalProps> {
  componentDidUpdate() {
    if (this.modal) {
      const width = document.body.clientWidth;
      const height = document.body.clientHeight;
      const rect = findDOMNode(this.modal).getBoundingClientRect();
      if (rect) {
        if (rect.left + rect.width > width) {
          this.modal.style.left = `${width - rect.left - rect.width}px`;
        }
        if (rect.top + rect.height > height) {
          this.modal.style.top = `${height - rect.top - rect.height}px`;
        }
      }
    }
  }

  saveRef = (node) => {
    this.modal = node;
  };

  render() {
    const { children, visible } = this.props;
    return (
      <div className={px}
           ref={this.saveRef}
           style={{ display: visible ? 'inline-block' : 'none' }}
      >
        {children}
      </div>
    );
  }
}

export default Modal;
