import { ReservationServiceModule } from './../reservation/reservation.service.module';
import { Reservation } from './../../entities/reservation/reservation.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubscriptionService } from './subscription.service';
import { Subscription } from './../../entities/subscription/subscription.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Subscription, Reservation]),
    ReservationServiceModule,
  ],
  controllers: [],
  providers: [SubscriptionService],
  exports: [SubscriptionService],
})
export class SubscriptionServiceModule {}
