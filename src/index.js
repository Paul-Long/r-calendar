import React from 'react';
import { prefix, PickerType, CalendarType } from './variable';
import Calendar from './calendar';
import Range from './range';
import { Modal, Icon, Input, RangeInput } from './components';
import './index.css';

class Wrapper extends React.PureComponent {
  static defaultProps = {
    pickerType: PickerType.DATE,
    calendarType: CalendarType.INPUT,
  };
  state = {
    visible: false
  };

  handleFocus = () => {
    const { visible } = this.state;
    this.setState({ visible: true });
  };

  handleChange = (value) => {
    const { onChange } = this.props;
    this.setState({ visible: false });
    if (typeof onChange === 'function') {
      onChange(value);
    }
  };

  renderMain = () => {
    const { calendarType, pickerType } = this.props;
    switch (calendarType) {
      case CalendarType.INPUT:
        if (pickerType === PickerType.RANGE) {
          return (<RangeInput onClick={this.handleFocus} />);
        }
        return (<Input onClick={this.handleFocus} />);
      case CalendarType.ICON:
        return (<Icon type='calendar' onClick={this.handleFocus} />);
    }
  };

  renderChild = () => {
    const { pickerType, ...other } = this.props;
    other.onChange = this.handleChange;
    switch (pickerType) {
      case PickerType.DATE:
        return <Calendar {...other} />;
      case PickerType.RANGE:
        return <Range {...other} />;
    }
  };

  render() {
    return (
      <div className={`${prefix}-wrapper`}>
        {this.renderMain()}
        <Modal visible={this.state.visible} onClick={v => this.setState({ visible: v })}>
          {this.renderChild()}
        </Modal>
      </div>
    );
  }
}

export default Wrapper;

export {
  PickerType,
  CalendarType
};
