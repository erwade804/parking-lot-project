import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Member } from '../../entities/member/member.entity';
import { ReservationService } from './reservation.service';

@Module({
  imports: [TypeOrmModule.forFeature([Member])],
  controllers: [],
  providers: [ReservationService],
  exports: [ReservationService],
})
export class ReservationServiceModule {}
