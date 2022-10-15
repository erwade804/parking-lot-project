import { LoginControllerModule } from './login/login.controller.module';
import { TestControllerModule } from './tests/test.controller.module';
import { Module } from '@nestjs/common';
import { MemberControllerModule } from './member/member.controller.module';
import { SeedControllerModule } from './seed/seed.controller.module';
import { ReservationControllerModule } from './reservation/reservation.controller.module';

@Module({
  imports: [
    MemberControllerModule,
    SeedControllerModule,
    LoginControllerModule,
    TestControllerModule,
    ReservationControllerModule,
  ],
})
export class ControllersModule {}
