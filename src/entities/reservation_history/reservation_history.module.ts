import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReservationHistory } from './reservation_history.entity';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([ReservationHistory])],
})
export class ReservationModule {}
