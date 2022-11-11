import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReservationHisotry } from './reservation_history.entity';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([ReservationHisotry])],
})
export class ReservationModule {}
