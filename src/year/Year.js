import React from 'react';
import { prefix } from '../variable';
import { YearProps } from '../Props';

class Year extends React.PureComponent<YearProps> {
  render() {
    const { children, onClick } = this.props;
    return (
      <td className={`${prefix}-cell`}>
        <div className={`${prefix}-year`} onClick={!children ? () => null : onClick}>
          {children}
        </div>
      </td>
    );
  }
}

export default Year;
