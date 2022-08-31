import moment from 'moment';

const dateColumnTransformer = {
  to: (value?: moment.Moment): number =>
    !value || !moment.isMoment(value)
      ? (value as unknown as number)
      : value.unix(),
  from: (value?: number | string): moment.Moment | number =>
    !value || Number(value) <= 0 ? Number(value) : moment.unix(Number(value)),
};

export default dateColumnTransformer;
