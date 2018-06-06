import React from 'react';
import moment from 'moment';
import { findDOMNode } from 'react-dom';
import { CalendarType, FORMAT, PickerType, prefix } from './variable';
import Calendar from './calendar';
import Range from './range';
import { Icon, Input, Modal, RangeInput } from './components';
import { PickerProps } from './Props';
import './index.css';

class Picker extends React.PureComponent<PickerProps> {
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

  componentDidUpdate() {
    const { visible } = this.state;
    if (visible && this.ctr && this.modal) {
      const width = document.body.clientWidth;
      const height = document.body.clientHeight;
      const cRect = findDOMNode(this.ctr).getBoundingClientRect();
      const mRect = findDOMNode(this.modal).getBoundingClientRect();
      console.log(width, height, cRect, mRect);
      if (cRect.left + mRect.width > width) {
        this.modal.style.left = `${width - mRect.width}px`;
      } else {
        this.modal.style.left = `${cRect.left}px`;
      }
      if (cRect.top + mRect.height > height) {
        this.modal.style.top = `${height - mRect.height}px`;
      } else {
        this.modal.style.top = `${cRect.top}px`;
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

  saveRef = (name) => {
    return n => this[name] = n;
  };

  renderIcon = () => {
    const { iconRender } = this.props;
    let icon;
    if (typeof iconRender === 'function') {
      icon = <div style={{ display: 'inline-block' }}
                  ref={this.saveRef('ctr')}
                  onClick={this.handleFocus}>{iconRender()}</div>;
    } else {
      icon = (<Icon type='calendar'
                    ref={this.saveRef('ctr')}
                    onClick={this.handleFocus} />);
    }
    return icon;
  };

  renderMain = () => {
    const { calendarType, pickerType, format, iconRender } = this.props;
    const { value } = this.state;
    const props = {
      onClick: this.handleFocus,
      value,
      iconRender,
      format,
      ref: this.saveRef('ctr'),
    };
    switch (calendarType) {
      case CalendarType.INPUT:
        if (pickerType === PickerType.RANGE) {
          return (<RangeInput {...props} />);
        }
        return (<Input {...props} />);
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
        <Modal visible={this.state.visible}
               saveRef={this.saveRef}
               onClick={v => this.setState({ visible: v })}>
          {this.renderChild()}
        </Modal>
        <div className={`${prefix}-mask`}
             style={{ display: visible ? 'block' : 'none' }}
             onClick={this.handleMaskClick} />
      </div>
    );
  }
}

export default Picker;

export const PICKER_TYPE = PickerType;
export const CALENDAR_TYPE = CalendarType;

