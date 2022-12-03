import { SubscriptionServiceModule } from './../../services/subscription/subscription.service.module';
import { AuthenticationTokenServiceModule } from './../../services/authentication/authentication.service.module';
import { Module } from '@nestjs/common';
import { SubscriptionController } from './subscription.controller';

@Module({
  imports: [AuthenticationTokenServiceModule, SubscriptionServiceModule],
  controllers: [SubscriptionController],
  providers: [],
})
export class SubscriptionControllerModule {}
