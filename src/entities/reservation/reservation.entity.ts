<<<<<<< Updated upstream
<<<<<<< Updated upstream
import dateColumnTransformer from '../../helpers/dateColumnTransformer';
import { Entity, Column, BaseEntity, PrimaryGeneratedColumn } from 'typeorm';
=======
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';
>>>>>>> Stashed changes
=======
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';
>>>>>>> Stashed changes

@Entity()
export class Reservation extends BaseEntity {
  @PrimaryGeneratedColumn()
<<<<<<< Updated upstream
<<<<<<< Updated upstream
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
=======
=======
>>>>>>> Stashed changes
  id: number;

  @Column()
  name: string;
  first_name: string;

  @Column()
  license_plate: string;
  last_name: string;

  @Column()
  license_number: string;

  @Column()
  VIN: string;

  @Column()
  card_id: number;

  @Column()
  email: string;

  @Column()
  phone_number: string;
<<<<<<< Updated upstream
}
>>>>>>> Stashed changes
=======
}
>>>>>>> Stashed changes
