import { LoginServiceModule } from './login/login.service.module';
import { SeedServiceModule } from './seed/seed.service.module';
import { Module } from '@nestjs/common';
import { MemberServiceModule } from './member/member.service.module';
import { RandomServiceModule } from './random/random.service.module';
import { AuthenticationTokenServiceModule } from './authentication/authentication.service.module';
import { ReservationServiceModule } from './reservation/reservation.service.module';

@Module({
  imports: [
    MemberServiceModule,
    RandomServiceModule,
    SeedServiceModule,
    AuthenticationTokenServiceModule,
    LoginServiceModule,
    ReservationServiceModule,
  ],
})
export class ServicesModule {}
