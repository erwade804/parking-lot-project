import moment from 'moment';
import { Entity, Column, BaseEntity, PrimaryColumn } from 'typeorm';

@Entity()
export class ParkingLayout extends BaseEntity {
  @PrimaryColumn()
  parking_id: number;

  @Column()
  type: string;

  @Column()
  level: number;

  @Column()
  slot: number;

}
