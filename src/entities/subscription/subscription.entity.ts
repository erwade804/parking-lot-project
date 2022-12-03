import dateColumnTransformer from '../../helpers/dateColumnTransformer';
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';

@Entity()
export class Subscription extends BaseEntity {
  @PrimaryGeneratedColumn()
  subscription_id: number;

  @Column()
  id: number;

  @Column({ type: 'int', transformer: dateColumnTransformer })
  start_time: moment.Moment;

  @Column({ type: 'int', transformer: dateColumnTransformer })
  end_time: moment.Moment;

  @Column()
  type: number;

  @Column()
  parking_spot: number;

  @Column()
  book_id: number;
}
