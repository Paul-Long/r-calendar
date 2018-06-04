import React from 'react';
import classNames from 'classnames';
import moment from 'moment';
import { DateProps } from './Props';
import { prefix } from './variable';

class Date extends React.PureComponent<DateProps> {
  handleClick = () => {
  };

  render() {
    const { className, renderDate, data } = this.props;
    let date = data.date;
    if (typeof renderDate === 'function') {
      date = renderDate(data);
    }
    const cls = classNames(
      `${prefix}-date`,
      className,
      {
        [`${prefix}-date-next`]: data.isNext,
        [`${prefix}-date-front`]: data.isFront,
        [`${prefix}-date-today`]: `${data.year}-${data.month}-${data.date}` === moment().format('YYYY-M-D'),
      }
    );
    return (
      <td className={`${prefix}-table-cell`} onClick={this.handleClick}>
        <div className={cls}>
          {date}
        </div>
      </td>
    );
  }
}

export default Date;
