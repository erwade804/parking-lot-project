import { Reservation } from './../../entities/reservation/reservation.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReservationServiceModule } from './../../services/reservation/reservation.service.module';
import { RandomServiceModule } from './../../services/random/random.service.module';
import { Module } from '@nestjs/common';
import { MemberServiceModule } from '../../services/member/member.service.module';
import { TestCron } from './test.cron';

@Module({
  imports: [
    MemberServiceModule,
    RandomServiceModule,
    ReservationServiceModule,
    TypeOrmModule.forFeature([Reservation]),
  ],
  providers: [TestCron],
  exports: [TestCron],
})
export class TestCronModule {}
