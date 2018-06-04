import React from 'react';
import moment from 'moment';
import classNames from 'classnames';
import { prefix } from './variable';
import { RangeProps } from './Props';
import Calendar from './Calendar';

class Range extends React.PureComponent<RangeProps> {
  static defaultProps = {
    value: []
  };
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

  render() {
    const { className } = this.props;
    const { startDate, endDate } = this.getValue();
    const pf = `${prefix}-range`;
    return (
      <div className={classNames(pf, className)}>
        <div className={`${pf}-select`}>

        </div>
        <Calendar value={startDate} />
        <Calendar value={endDate} />
      </div>
    );
  }
}

export default Range;
