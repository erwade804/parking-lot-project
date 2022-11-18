import { ParkingControllerModule } from './parking/parking.controller.module';
import { LoginControllerModule } from './login/login.controller.module';
import { TestControllerModule } from './tests/test.controller.module';
import { Module } from '@nestjs/common';
import { MemberControllerModule } from './member/member.controller.module';
import { ReservationControllerModule } from './reservation/reservation.controller.module';

@Module({
  imports: [
    MemberControllerModule,
    LoginControllerModule,
    TestControllerModule,
    ReservationControllerModule,
    ParkingControllerModule,
  ],
})
export class ControllersModule {}
