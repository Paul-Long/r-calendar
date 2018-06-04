import React from 'react';
import classNames from 'classnames';
import moment from 'moment';
import { CalendarProps } from './Props';
import { prefix, weeks, FORMAT } from './variable';
import { monthDay } from './utils';
import Date from './Date';
import Button from './Button';

class Calendar extends React.PureComponent<CalendarProps> {
  static defaultProps = {
    format: FORMAT
  };

  constructor(props) {
    super(props);
    this.state = {
      days: monthDay(props.value || moment())
    };
  }

  renderDate = (data) => {
    const { renderDate, dateWidth, dateHeight, format } = this.props;
    const { year, month, date } = data;
    const props = {
      key: `${year}-${month}-${date}`,
      renderDate,
      dateWidth,
      dateHeight,
      data,
      format,
    };
    return (
      <Date {...props} />
    );
  };

  render() {
    let { className, value } = this.props;
    const { days } = this.state;
    value = value || moment();
    const cls = classNames(prefix, className);
    return (
      <div className={cls}>
        <div className={`${prefix}-ym`}>
          <Button type='left' double />
          <Button type='left' double={false} />
          <div className={`${prefix}-ym-center`}>
            <div className={`${prefix}-year`}>{`${value.year()}年`}</div>
            <div className={`${prefix}-month`}>{`${value.month() + 1}月`}</div>
          </div>
          <Button type='right' double={false} />
          <Button type='right' double />
        </div>
        <table className={`${prefix}-table`}>
          <thead>
          <tr>
            {weeks.map(w => <th key={w}>
              <div className={`${prefix}-th`}>{w}</div>
            </th>)}
          </tr>
          </thead>
          <tbody>
          {
            days.map((ws, index) => (
              <tr key={`week-${index}`}>
                {ws.map(this.renderDate)}
              </tr>
            ))
          }
          </tbody>
        </table>
      </div>
    );
  }
}

export default Calendar;
