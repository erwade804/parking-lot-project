import { Entity, Column, BaseEntity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Member extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  first_name: string;

  @Column()
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
}
