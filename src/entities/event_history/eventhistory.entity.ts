import moment from 'moment';
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';
import dateColumnTransformer from '../../helpers/dateColumnTransformer';

@Entity()
export class EventHistory extends BaseEntity {
  @PrimaryGeneratedColumn()
  event_type: number

  @Column()
  id: number;

  @Column()
  licensenumber: string;

  @Column()
  timestamp: moment.Moment
}
