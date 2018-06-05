import React from 'react';
import classNames from 'classnames';
import moment from 'moment';
import { CalendarProps } from '../Props';
import { FORMAT, Mode, prefix } from '../variable';
import { monthDay } from '../utils';
import { DatePanel } from '../date';
import { MonthPanel } from '../month';
import { YearPanel } from '../year';
import Header from './Header';

class Calendar extends React.PureComponent<CalendarProps> {
  static defaultProps = {
    format: FORMAT[1],
    leftEnable: true,
    rightEnable: true,
  };

  constructor(props) {
    super(props);
    const value = props.value || moment();
    this.state = {
      value,
      mode: Mode.DATE,
    };
  }

  componentWillReceiveProps(next) {
    if (next.value && next.value !== this.props) {
      this.setState({ value: next.value });
    }
  }

  handleMomentChange = event => {
    const { onPanelChange } = this.props;
    const num = parseInt(event.target['data-num']);
    const unit = event.target['data-unit'];
    let { value, mode } = this.state;
    if (mode === Mode.DATE) {
      value = value.startOf('M').subtract(num, unit);
    } else if (mode === Mode.MONTH) {
      value = value.startOf('M').subtract(num, unit);
    } else if (mode === Mode.YEAR) {
      value = value.startOf('M').subtract(num * 10, unit);
    } else if (mode === Mode.GROUP) {
      value = value.startOf('M').subtract(num * 100, unit);
    }
    value = moment(value);
    this.setState({ value, days: monthDay(value) }, () => {
      onPanelChange(value, this.state.mode);
    });
  };

  handleChange = (value, str) => {
    const { onChange } = this.props;
    if (typeof onChange === 'function') {
      onChange(value, str);
    }
  };

  handleModeChange = (mode) => {
    if (this.state.mode === Mode.DATE) {
      this.Mode_Bak = mode;
    }
    if (mode === Mode.YEAR && this.state.mode === Mode.YEAR) {
      mode = Mode.GROUP;
    }
    this.setState({ mode });
  };

  handlePanelClick = (arg, mode) => {
    const {onPanelChange} = this.props;
    const { value } = this.state;
    const state = {};
    if (mode === Mode.MONTH) {
      state.value = moment(value.set('month', arg));
      state.mode = Mode.DATE;
      this.Mode_Bak = null;
    } else if (mode === Mode.YEAR) {
      state.value = moment(value.set('year', arg));
      if (this.Mode_Bak === Mode.MONTH) {
        state.mode = Mode.MONTH;
      } else {
        state.mode = Mode.DATE;
      }
      this.Mode_Bak = null;
    } else if (mode === Mode.GROUP) {
      state.value = moment(value.set('year', arg[1]));
      state.mode = Mode.YEAR;
    }
    this.setState(state, () => {
      onPanelChange(this.state.value, this.state.mode);
    });
  };

  renderPanel = () => {
    const { mode, value } = this.state;
    const { renderDate, dateWidth, dateHeight, format, selectValue } = this.props;
    const props = { renderDate, dateWidth, dateHeight, format, selectValue, value, mode };
    switch (mode) {
      case Mode.MONTH:
        return <MonthPanel {...props}
                           onClick={m => this.handlePanelClick(m, Mode.MONTH)} />;
      case Mode.YEAR:
      case Mode.GROUP:
        return <YearPanel {...props}
                          onClick={y => this.handlePanelClick(y, mode)} />;
    }
  };

  renderDatePanel = () => {
    const { value } = this.state;
    const { renderDate, dateWidth, dateHeight, format, selectValue } = this.props;
    const props = { renderDate, dateWidth, dateHeight, format, selectValue, value };
    return <DatePanel {...props} onSelect={this.handleChange} />;
  };

  render() {
    const { className, leftEnable, rightEnable } = this.props;
    const { value, mode } = this.state;
    const cls = classNames(prefix, className);
    return (
      <div className={cls}>
        <Header value={value}
                mode={mode}
                leftEnable={leftEnable || mode !== Mode.DATE}
                rightEnable={rightEnable || mode !== Mode.DATE}
                onModeChange={this.handleModeChange}
                onMomentChange={this.handleMomentChange}
        />
        <div className={`${prefix}-panels`}>
          {this.renderDatePanel()}
          {this.renderPanel()}
        </div>
      </div>
    );
  }
}

export default Calendar;
