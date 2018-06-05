import React from 'react';
import classNames from 'classnames';
import moment from 'moment';
import { DateProps } from '../Props';
import { prefix, FORMAT } from '../variable';

class Date extends React.PureComponent<DateProps> {
  isSelect = () => {
    const { selectValue, data } = this.props;
    const { date, month, year, isFront, isNext } = data;
    if (isFront || isNext) {
      return false;
    }
    if (selectValue instanceof Array) {
      return selectValue.some(s => moment(`${year}-${month}-${date}`, FORMAT[2]).isSame(moment(s)));
    }
    return moment(`${year}-${month}-${date}`, FORMAT[2]).isSame(moment(selectValue));
  };

  handleClick = () => {
    const { data, onClick, format } = this.props;
    const { date, month, year } = data;
    if (typeof onClick === 'function') {
      const value = moment(`${year}-${month}-${date}`, FORMAT[2]);
      onClick(value, value.format(format));
    }
  };

  render() {
    const { className, renderDate, data } = this.props;
    let date = data.date;
    const { month, year, isFront, isNext } = data;
    const isToday = `${year}-${month}-${date}` === moment().format(FORMAT[2]) && !isFront && !isNext;
    if (typeof renderDate === 'function') {
      date = renderDate(data);
    }
    const dateCls = `${prefix}-date`;
    const cls = classNames(
      dateCls,
      className,
      {
        [`${dateCls}-next`]: isNext,
        [`${dateCls}-front`]: isFront,
        [`${dateCls}-today`]: isToday,
        [`${dateCls}-selected`]: this.isSelect(),
      }
    );
    return (
      <td className={`${prefix}-cell`} onClick={this.handleClick}>
        <div className={cls}>
          {date}
        </div>
      </td>
    );
  }
}

export default Date;
