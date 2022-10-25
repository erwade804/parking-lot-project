import { AuthenticationTokenServiceModule } from './../../services/authentication/authentication.service.module';
import { ReservationServiceModule } from './../../services/reservation/reservation.service.module';
import { ReservationController } from './reservation.controller';
import { Module } from '@nestjs/common';

@Module({
  imports: [ReservationServiceModule, AuthenticationTokenServiceModule],
  controllers: [ReservationController],
  providers: [],
})
export class ReservationControllerModule {}
