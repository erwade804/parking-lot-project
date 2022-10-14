import moment from 'moment';
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';

@Entity()
export class EventHistory extends BaseEntity {
  @PrimaryGeneratedColumn()
  event_type: number;

  @Column()
  id: number;

  @Column()
  licensenumber: string;

  @Column()
  timestamp: moment.Moment;
}
