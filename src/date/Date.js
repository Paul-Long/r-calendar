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
      return selectValue.some(s => s && `${year}-${month}-${date}` === s.format(FORMAT[2]));
    }
    return selectValue && `${year}-${month}-${date}` === selectValue.format(FORMAT[2]);
  };

  handleClick = (event) => {
    event.stopPropagation();
    const { data, onClick, format } = this.props;
    const { date, month, year } = data;
    if (typeof onClick === 'function') {
      const value = moment(`${year}-${month}-${date}`, FORMAT[2]);
      onClick(value, value.format(format));
    }
  };

  render() {
    const { className, dateRender, data, disabledDate } = this.props;
    let { date } = data;
    const { month, year, isFront, isNext } = data;
    const isToday = `${year}-${month}-${date}` === moment().format(FORMAT[2]) && !isFront && !isNext;
    const current = moment([year, month - 1, date]);
    const today = moment();
    if (typeof dateRender === 'function') {
      date = dateRender(current, today);
    }
    const disabled = disabledDate && disabledDate(current, today);
    const dateCls = `${prefix}-date`;
    const cls = classNames(
      dateCls,
      className,
      {
        [`${dateCls}-next`]: isNext,
        [`${dateCls}-front`]: isFront,
        [`${dateCls}-today`]: isToday,
        [`${dateCls}-selected`]: this.isSelect(),
        [`${dateCls}-disabled`]: disabled,
      },
    );
    return (
      <td className={`${prefix}-cell`}>
        <div className={cls} onClick={disabled ? () => null : this.handleClick}>
          {date}
        </div>
      </td>
    );
  }
}

export default Date;
