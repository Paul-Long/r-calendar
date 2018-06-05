import React from 'react';
import { Button } from '../components';
import { prefix, Mode, HeaderMode } from '../variable';
import { years, yearGroup } from '../utils';
import { HeaderProps } from '../Props';

const px = `${prefix}-header`;

class Header extends React.PureComponent<HeaderProps> {

  renderMode = (mode) => {
    const { value, onModeChange } = this.props;
    let text;
    const [func, cn] = HeaderMode[mode];
    if (this.props.mode === Mode.YEAR) {
      const ys = years(value.year());
      text = `${ys[1]}-${ys[10]}`;
    } else if (this.props.mode === Mode.GROUP) {
      const ys = yearGroup(value.year());
      text = `${ys[1][1]}-${ys[10][10]}`;
    } else {
      text = `${value[func]() + (mode === Mode.MONTH ? 1 : 0)}${cn}`;
    }
    return (
      <div className={`${px}-center-${func}`}
           onClick={() => onModeChange(mode)}>{text}</div>
    );
  };

  renderButton = (num, unit) => {
    const { onMomentChange } = this.props;
    const type = num > 0 ? 'left' : 'right';
    const props = {
      type,
      ['data-num']: num,
      ['data-unit']: unit,
      double: unit === 'Y',
      onClick: onMomentChange,
    };
    return this.props[`${type}Enable`] && (<Button {...props} />);
  };

  renderLeft = () => {
    const { mode } = this.props;
    return (
      <div className={`${px}-left`}>
        {this.renderButton(1, 'Y')}
        {mode === Mode.DATE && this.renderButton(1, 'M')}
      </div>
    );
  };

  renderCenter = () => {
    const { mode } = this.props;
    return (
      <div className={`${px}-center`}>
        {this.renderMode(mode === Mode.GROUP ? mode : Mode.YEAR)}
        {mode === Mode.DATE && this.renderMode(Mode.MONTH)}
      </div>
    );
  };

  renderRight = () => {
    const { mode } = this.props;
    return (
      <div className={`${px}-right`}>
        {mode === Mode.DATE && this.renderButton(-1, 'M')}
        {this.renderButton(-1, 'Y')}
      </div>
    );
  };

  render() {
    return (
      <div className={px}>
        {this.renderLeft()}
        {this.renderCenter()}
        {this.renderRight()}
      </div>
    );
  }
}

export default Header;
