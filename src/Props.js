import moment from 'moment';
import { Mode } from './variable';

export type CalendarProps = {
  renderDate?: Function,
  className?: string,
  dateWidth?: number,
  dateHeight?: number,
  value?: moment,
  format?: string,
  leftEnable: boolean,
  rightEnable: boolean,
  onChange?: Function,
  onPanelChange?: Function,
  selectValue: moment | Array<moment>,
};

export type DateProps = {
  className?: string,
  renderDate: Function,
  format: string,
  data: Object,
  selectValue: moment | Array<moment>
}

export type RangeProps = {
  className?: string,
  value: Array<moment>,
  renderDate: Function,
  dateWidth: number,
  dateHeight: number,
  format: string,
  onChange: Function,
}

export type ButtonProps = {
  double: boolean,
  type: string,
  onClick?: Function,
};

export type DatePanelProps = {
  renderDate: Function,
  dateWidth: number,
  dateHeight: number,
  format: string,
  selectValue: moment | Array<moment>,
  value: moment,
  onSelect: Function,
}

export type MonthPanelProps = {
  onClick?: Function,
}

export type HeaderProps = {
  value: moment,
  onModeChange?: Function,
  onMomentChange?: Function,
  leftEnable: boolean,
  rightEnable: boolean,
  mode: Mode,
};

export type MonthProps = {
  onClick: Function,
  children: any,
}

export type YearPanelProps = {
  value: moment,
  onClick: Function,
}

export type YearProps = {
  children: any,
  onClick: Function,
};

export type IconProps = {
  type: string,
}

export type ModalProps = {
  children: any,
  visible: boolean,
  onClick: Function,
}
