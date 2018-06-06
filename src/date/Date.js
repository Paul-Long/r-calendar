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
    const { className, dateRender, data } = this.props;
    let date = data.date;
    const { month, year, isFront, isNext } = data;
    const isToday = `${year}-${month}-${date}` === moment().format(FORMAT[2]) && !isFront && !isNext;
    if (typeof dateRender === 'function') {
      date = dateRender(moment([year, month - 1, date]), moment());
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
