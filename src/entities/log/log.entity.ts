import { actions } from '../../constants/logaction';
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';
import dateColumnTransformer from '../../helpers/dateColumnTransformer';

@Entity()
export class Log extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('enum')
  action: actions;

  @Column({ type: 'int', transformer: dateColumnTransformer })
  time: number;
}
