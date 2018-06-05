import React from 'react';
import { months, prefix } from '../variable';
import { MonthPanelProps } from '../Props';
import Month from './Month';

class MonthPanel extends React.PureComponent<MonthPanelProps> {
  renderMonth = (ms, row) => {
    const { onClick } = this.props;
    return ms.map((m, index) => (
      <Month key={`month-${m}`} onClick={() => onClick(index + (row * 3))}>{m}</Month>
    ));
  };

  render() {
    return (
      <div className={`${prefix}-month-panel`}>
        <table>
          <tbody>
          {
            months.map((ms, i) => (<tr key={`month-row-${i}`}>{this.renderMonth(ms, i)}</tr>))
          }
          </tbody>
        </table>
      </div>
    );
  }
}

export default MonthPanel;
