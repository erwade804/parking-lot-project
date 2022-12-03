import { SubscriptionServiceModule } from './subscription/subscription.service.module';
import { LoginServiceModule } from './login/login.service.module';
import { Module } from '@nestjs/common';
import { MemberServiceModule } from './member/member.service.module';
import { RandomServiceModule } from './random/random.service.module';
import { AuthenticationTokenServiceModule } from './authentication/authentication.service.module';
import { ReservationServiceModule } from './reservation/reservation.service.module';

@Module({
  imports: [
    MemberServiceModule,
    RandomServiceModule,
    AuthenticationTokenServiceModule,
    LoginServiceModule,
    ReservationServiceModule,
    SubscriptionServiceModule,
  ],
})
export class ServicesModule {}
