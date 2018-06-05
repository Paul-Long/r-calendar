import React from 'react';
import { prefix, Mode } from '../variable';
import { years, yearGroup } from '../utils';
import { YearPanelProps } from '../Props';
import chunk from 'lodash/chunk';
import Year from './Year';

class YearPanel extends React.PureComponent<YearPanelProps> {
  constructor(props) {
    super(props);
    this.state = {
      years: this.getYears(props),
    };
  }

  componentWillReceiveProps(next) {
    if (next.value !== this.props.value || next.mode !== this.props.mode) {
      this.setState({ years: this.getYears(next) });
    }
  }

  getYears = (props) => {
    const { value, mode } = props;
    let ys;
    if (mode === Mode.YEAR) {
      ys = years(value.year());
    } else if (mode === Mode.GROUP) {
      ys = yearGroup(value.year());
    }
    return ys;
  };

  getText = (y) => {
    const { mode } = this.props;
    if (mode === Mode.GROUP && y instanceof Array) {
      return `${y[1]}-${y[10]}`;
    }
    return y;
  };

  renderYear = () => {
    const { years } = this.state;
    const { onClick } = this.props;
    return chunk(years, 3).map((ys, i) => (
      <tr key={`year-row-${i}`}>{
        ys.map(y => <Year key={`year-${y}`} onClick={() => onClick(y)}>{this.getText(y)}</Year>)
      }</tr>
    ));
  };

  render() {
    return (
      <div className={`${prefix}-year-panel`}>
        <table>
          <tbody>
          {this.renderYear()}
          </tbody>
        </table>
      </div>
    );
  }
}

export default YearPanel;
