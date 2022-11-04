import * as moment from 'moment';

const dateColumnTransformer = {
  to: (value: moment.Moment): number => value?.unix(),
  from: (value: number): moment.Moment => moment.unix(Number(value)),
};

export default dateColumnTransformer;
