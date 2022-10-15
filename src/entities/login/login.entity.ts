import dateColumnTransformer from '../../helpers/dateColumnTransformer';
import { Entity, Column, BaseEntity, PrimaryColumn } from 'typeorm';

@Entity()
export class Login extends BaseEntity {
  @PrimaryColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  authtoken: string;

  @Column({ type: 'int', transformer: dateColumnTransformer })
  lastUpdated: moment.Moment;
}
