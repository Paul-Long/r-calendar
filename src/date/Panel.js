import React from 'react';
import { prefix, weeks } from '../variable';
import { DatePanelProps } from '../Props';
import { monthDay } from '../utils';
import Date from './Date';

class DatePanel extends React.PureComponent<DatePanelProps> {
  constructor(props) {
    super(props);
    this.state = {
      days: monthDay(props.value),
    };
  }

  componentWillReceiveProps(next) {
    if (next.value && next.value !== this.props.value) {
      this.setState({ days: monthDay(next.value) });
    }
  }

  renderDate = (data) => {
    const { dateRender, dateWidth, dateHeight, format, selectValue, onSelect, disabledDate } = this.props;
    const { year, month, date } = data;
    const props = {
      key: `${year}-${month}-${date}`,
      dateRender,
      dateWidth,
      dateHeight,
      data,
      format,
      onClick: onSelect,
      selectValue,
      disabledDate,
    };
    return (<Date {...props} />);
  };

  renderWeek = () => {
    const ws = [];
    for (const w of weeks) {
      ws.push(
        <th key={w}>
          <div className={`${prefix}-th`}>{w}</div>
        </th>);
    }
    return (<tr>{ws}</tr>);
  };

  render() {
    const { days } = this.state;
    let index = 0;
    return (
      <div className={`${prefix}-date-panel`}>
        <table>
          <thead>
            {this.renderWeek()}
          </thead>
          <tbody>
            {
              days.map(ws => (
                <tr key={`date-row-${index += 1}`}>
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

export default DatePanel;
