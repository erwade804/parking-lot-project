import { Reservation } from './../../entities/reservation/reservation.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MemberServiceModule } from './../../services/member/member.service.module';
import { AuthenticationTokenServiceModule } from './../../services/authentication/authentication.service.module';
import { ReservationServiceModule } from './../../services/reservation/reservation.service.module';
import { Module } from '@nestjs/common';
import { ParkingController } from './parking.controller';

@Module({
  imports: [
    ReservationServiceModule,
    AuthenticationTokenServiceModule,
    MemberServiceModule,
    TypeOrmModule.forFeature([Reservation]),
  ],
  controllers: [ParkingController],
  providers: [],
})
export class ParkingControllerModule {}
