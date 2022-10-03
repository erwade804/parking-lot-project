import dateColumnTransformer from '../../helpers/dateColumnTransformer';
import { Entity, Column, BaseEntity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Reservation extends BaseEntity {
  @PrimaryGeneratedColumn()
  book_id: number;

  @Column()
  id: number;

  @Column({ type: 'int', transformer: dateColumnTransformer })
  start_time: number;

  @Column({ type: 'int', transformer: dateColumnTransformer })
  end_time: number;

  @Column({ type: 'int', transformer: dateColumnTransformer })
  entry_time: number;

  @Column({ type: 'int', transformer: dateColumnTransformer })
  exit_time: number;
}
