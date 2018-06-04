import moment from 'moment';

export const current = (value) => {
  const _value = value;
  const now = value.startOf('month');
  const day = now.day();
  const date = now.date();
  const month = now.month() + 1;
  const year = now.year();
  const front = moment(_value).subtract(1, 'M');
  const endDate = front.endOf('month').date();
  const startDate = endDate - day + 1;
  const next = moment(value).add(1, 'month');
  return {
    front: {
      moment: front,
      year: front.year(),
      month: front.month() + 1,
      startDate,
      endDate,
    },
    day,
    date,
    month,
    year,
    endDate: now.endOf('month').date(),
    next: {
      moment: next,
      year: next.year(),
      month: next.month() + 1,
    }
  };
};

export const monthDay = (value) => {
  const { day, endDate, month, year, front, next } = current(value);
  let arr = [];
  let date = 1;
  let nDate = 1;
  for (let i = 0; i < 6; i++) {
    let weeks = [];
    for (let w = 1; w <= 7; w++) {
      if (i === 0) {
        if (day > w) {
          weeks.push({ year: front.year, month: front.month, date: front.startDate + w - 1, week: w, isFront: true });
        } else {
          weeks.push({ year, month, date: date++, week: w });
        }
      } else {
        if (date <= endDate) {
          weeks.push({ year, month, date: date++, week: w });
        } else {
          weeks.push({ year: next.year, month: next.month, date: nDate++, week: w, isNext: true });
        }
      }
    }
    arr.push(weeks);
  }
  return arr;
};

