import React from 'react';
import { prefix } from '../variable';
import { MonthProps } from '../Props';

class Month extends React.PureComponent<MonthProps> {
  render() {
    const { children, onClick } = this.props;
    return (
      <td className={`${prefix}-cell`}>
        <div className={`${prefix}-month`} onClick={onClick}>
          {children}
        </div>
      </td>
    );
  }
}

export default Month;
