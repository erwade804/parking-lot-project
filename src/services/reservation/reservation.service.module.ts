import { Reservation } from './../../entities/reservation/reservation.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Member } from '../../entities/member/member.entity';
import { ReservationService } from './reservation.service';

@Module({
  imports: [TypeOrmModule.forFeature([Member, Reservation])],
  controllers: [],
  providers: [ReservationService],
  exports: [ReservationService],
})
export class ReservationServiceModule {}
