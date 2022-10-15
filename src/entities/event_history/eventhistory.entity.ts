import moment from 'moment';
import dateColumnTransformer from 'src/helpers/dateColumnTransformer';
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';

@Entity()
export class EventHistory extends BaseEntity {
  @PrimaryGeneratedColumn()
  event_type: number;

  @Column()
  id: number;

  @Column()
  licensenumber: string;

  @Column({ type: 'int', transformer: dateColumnTransformer })
  timestamp: moment.Moment;
}
