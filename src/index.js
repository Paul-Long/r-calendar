import React from 'react';
import moment from 'moment';
import { prefix, PickerType, CalendarType, FORMAT } from './variable';
import Calendar from './calendar';
import Range from './range';
import { Modal, Icon, Input, RangeInput } from './components';
import { WrapperProps } from './Props';
import './index.css';

class Wrapper extends React.PureComponent<WrapperProps> {
  static defaultProps = {
    pickerType: PickerType.DATE,
    calendarType: CalendarType.INPUT,
    format: FORMAT[1],
  };
  state = {
    visible: false,
    value: undefined,
    selectValue: undefined,
  };

  componentWillReceiveProps(next) {
    const { value, pickerType } = next;
    if (value !== this.props.value && value !== this.state.value) {
      if (pickerType === PickerType.DATE) {
        this.setState({ value: value ? moment(value) : value, selectValue: value ? moment(value) : value });
      } else if (pickerType === PickerType.RANGE) {
        this.setState({
          value: (value || []).map(v => moment(v)),
          selectValue: (value || []).map(v => moment(v)),
        });
      }
    }
  }

  handleFocus = () => {
    this.setState({ visible: true });
  };

  handleMaskClick = (event) => {
    event.stopPropagation();
    this.setState({ visible: false });
  };

  handleChange = (value) => {
    const { onChange, pickerType } = this.props;
    const state = { visible: false };
    if (pickerType === PickerType.DATE) {
      state.value = moment(value);
      state.selectValue = moment(value);
    } else if (pickerType === PickerType.RANGE) {
      value = value || [];
      state.value = value.map(v => moment(v));
      state.selectValue = value.map(v => moment(v));
    }
    this.setState(state);
    if (typeof onChange === 'function') {
      onChange(state.value);
    }
  };

  renderIcon = () => {
    const { iconRender } = this.props;
    let icon = (<Icon type='calendar' onClick={this.handleFocus} />);
    if (typeof iconRender === 'function') {
      icon = <div style={{ display: 'inline-block' }} onClick={this.handleFocus}>{iconRender()}</div>;
    }
    return icon;
  };

  renderMain = () => {
    const { calendarType, pickerType, format, iconRender } = this.props;
    const { value } = this.state;
    switch (calendarType) {
      case CalendarType.INPUT:
        if (pickerType === PickerType.RANGE) {
          return (
            <RangeInput onClick={this.handleFocus}
                        value={value}
                        iconRender={iconRender}
                        format={format} />
          );
        }
        return (
          <Input onClick={this.handleFocus}
                 value={value}
                 iconRender={iconRender}
                 format={format} />
        );
      case CalendarType.ICON:
        return this.renderIcon();
    }
  };

  renderChild = () => {
    const { pickerType, ...other } = this.props;
    const { value, selectValue } = this.state;
    other.onChange = this.handleChange;
    other.value = value;
    other.selectValue = selectValue;
    switch (pickerType) {
      case PickerType.DATE:
        return <Calendar {...other} />;
      case PickerType.RANGE:
        return <Range {...other} />;
    }
  };

  render() {
    const { visible } = this.state;
    return (
      <div className={`${prefix}-wrapper`}>
        {this.renderMain()}
        <Modal visible={this.state.visible} onClick={v => this.setState({ visible: v })}>
          {this.renderChild()}
        </Modal>
        <div className={`${prefix}-mask`}
             style={{ display: visible ? 'block' : 'none' }}
             onClick={this.handleMaskClick} />
      </div>
    );
  }
}

export default Wrapper;

export {
  PickerType,
  CalendarType
};
