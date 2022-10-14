import dateColumnTransformer from '../../helpers/dateColumnTransformer';
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';

@Entity()
export class Reservation extends BaseEntity {
  @PrimaryGeneratedColumn()
  book_id: number;

  @Column()
  id: number;

  @Column({ type: 'int', transformer: dateColumnTransformer })
  start_time: moment.Moment;

  @Column({ type: 'int', transformer: dateColumnTransformer })
  end_time: moment.Moment;

  @Column({ type: 'int', transformer: dateColumnTransformer })
  entry_time: moment.Moment;

  @Column({ type: 'int', transformer: dateColumnTransformer })
  exit_time: moment.Moment;
}
