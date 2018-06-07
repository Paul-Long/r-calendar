import React from 'react';
import classNames from 'classnames';
import { IconProps } from '../Props';

class Icon extends React.PureComponent<IconProps> {
  render() {
    const { type, ...other } = this.props;
    return (
      <div className={classNames('rcc-icon', `rcc-icon-${type}`)} {...other} />
    );
  }
}

export default Icon;
