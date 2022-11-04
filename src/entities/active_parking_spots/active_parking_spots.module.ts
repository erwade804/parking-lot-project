import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActiveParking } from './active_parking_spots.entity';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([ActiveParking])],
})
export class ActiveParkingModule {}
