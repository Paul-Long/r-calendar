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
    const { dateRender, dateWidth, dateHeight, format, selectValue, onSelect } = this.props;
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
    };
    return (<Date {...props} />);
  };

  render() {
    const { days } = this.state;
    return (
      <div className={`${prefix}-date-panel`}>
        <table>
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

export default DatePanel;
