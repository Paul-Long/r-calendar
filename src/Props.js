import moment from 'moment';

export type CalendarProps = {
  renderDate?: Function,
  className?: string,
  dateWidth?: number,
  dateHeight?: number,
  value?: moment,
  format?: string,
};

export type DateProps = {
  className?: string,
  renderDate: Function,
  data: Object,
}

export type RangeProps = {
  className?: string,
  value: Array<moment>,
  renderDate: Function,
  dateWidth: number,
  dateHeight: number,
  format: string,
}

export type ButtonProps = {
  double: boolean,
  type: string,
  onClick: Function,
};
