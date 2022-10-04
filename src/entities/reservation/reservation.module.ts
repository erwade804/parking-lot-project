import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reservation } from './reservation.entity';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([Reservation])],
})
<<<<<<< Updated upstream
<<<<<<< Updated upstream
export class ReservationModule {}
=======
export class ReservationModule {}
>>>>>>> Stashed changes
=======
export class ReservationModule {}
>>>>>>> Stashed changes
