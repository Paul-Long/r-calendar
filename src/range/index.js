import React from 'react';
import moment from 'moment';
import classNames from 'classnames';
import { FORMAT, prefix } from '../variable';
import { RangeProps } from '../Props';
import Calendar from '../calendar';
import { RangeInput } from '../components';

class Range extends React.PureComponent<RangeProps> {
  static defaultProps = {
    value: [],
    format: FORMAT[1],
  };

  constructor(props) {
    super(props);
    this.state = {
      ...this.getValue(),
      selectValue: props.selectValue,
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

  getRange = (selectValue) => {
    const [start, end] = selectValue || [];
    if (start && end) {
      if (start.isAfter(end)) {
        return [end, start];
      }
    }
    return [start, end];
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
      select = this.getRange(select);
      onChange(select, select.map(s => s.format(format)));
    }
  };

  calendarProps = (cls, key, diff) => {
    const pf = `${prefix}-range`;
    const { dateRender, disabledDate, visible } = this.props;
    return {
      className: `${pf}-${cls}`,
      value: this.state[key],
      onPanelChange: (v, m) => this.handlePanelChange(v, m, key),
      onChange: this.handleChange,
      selectValue: this.state.selectValue,
      dateRender,
      disabledDate,
      visible,
      [`${cls === 'left' ? 'right' : 'left'}Enable`]: diff,
    };
  };

  renderTitle = () => {
    const {title} = this.props;
    if (!title) {
      return '';
    }
    if (typeof title === 'function') {
      return title();
    }
    return title;
  };

  renderSelect = () => {
    const { selectValue } = this.state;
    const { format, iconRender } = this.props;
    return (<RangeInput
      value={this.getRange(selectValue)}
      showIcon={false}
      format={format}
      iconRender={iconRender}
      placeholder={['', '结束时间']}
    />);
  };

  render() {
    const { className } = this.props;
    const { startDate, endDate } = this.state;
    const pf = `${prefix}-range`;
    const endInt = parseInt(endDate.format(FORMAT[3]), 10);
    const startInt = parseInt(startDate.format(FORMAT[3]), 10);
    const diff = (endInt - startInt) !== 1;
    return (
      <div className={classNames(pf, className)}>
        <div className={`${pf}-select`}>
          {this.renderSelect()}
          <div className={`${pf}-title`}>
            {this.renderTitle()}
          </div>
        </div>
        <div className={`${pf}-content`}>
          <Calendar {...this.calendarProps('left', 'startDate', diff)} />
          <Calendar {...this.calendarProps('right', 'endDate', diff)} />
        </div>
      </div>
    );
  }
}

export default Range;
