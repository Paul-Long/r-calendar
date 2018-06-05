import React from 'react';
import moment from 'moment';
import classNames from 'classnames';
import { FORMAT, prefix } from '../variable';
import { RangeProps } from '../Props';
import Calendar from '../calendar';

class Range extends React.PureComponent<RangeProps> {
  static defaultProps = {
    value: [],
    format: FORMAT[1],
  };

  constructor(props) {
    super(props);
    this.state = {
      ...this.getValue(),
      selectValue: [],
    };
  }

  getValue = () => {
    const { value } = this.props;
    let [startDate, endDate] = value || [];
    if (!endDate) {
      endDate = moment();
    }
    if (!startDate || startDate >= endDate) {
      startDate = moment().subtract(1, 'M');
    }
    return { startDate, endDate };
  };

  handlePanelChange = (value, mode, key) => {
    this.setState({ [key]: moment(value) });
  };

  handleChange = (value) => {
    const { onChange, format } = this.props;
    value = moment(value);
    let select = this.state.selectValue || [];
    if (select.length === 2) {
      select = [value];
    } else {
      select.push(value);
    }
    this.setState({ selectValue: [...select] });
    if (typeof onChange === 'function' && select.length === 2) {
      const [start, end] = select;
      if (start.isBefore(end)) {
        onChange([start, end], [start.format(format), end.format(format)]);
      } else {
        onChange([end, start], [end.format(format), start.format(format)]);
      }
    }
  };

  render() {
    const { className } = this.props;
    const { startDate, endDate, selectValue } = this.state;
    const pf = `${prefix}-range`;
    const diff = parseInt(endDate.format(FORMAT[3])) - parseInt(startDate.format(FORMAT[3]));
    return (
      <div className={classNames(pf, className)}>
        <div className={`${pf}-select`}>

        </div>
        <div className={`${pf}-content`}>
          <Calendar className={`${pf}-left`}
                    value={startDate}
                    rightEnable={diff !== 1}
                    onPanelChange={(v, m) => this.handlePanelChange(v, m, 'startDate')}
                    onChange={this.handleChange}
                    selectValue={selectValue}
          />
          <Calendar className={`${pf}-right`}
                    value={endDate} leftEnable={diff !== 1}
                    onPanelChange={(v, m) => this.handlePanelChange(v, m, 'endDate')}
                    onChange={this.handleChange}
                    selectValue={selectValue}
          />
        </div>
      </div>
    );
  }
}

export default Range;
