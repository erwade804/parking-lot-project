import { Entity, Column, BaseEntity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ParkingLayout extends BaseEntity {
  @PrimaryGeneratedColumn()
  parking_id: number;

  @Column()
  level: number;

  @Column()
  slot: number;

  @Column()
  type: string;
}
