import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ParkingLayout } from './parkinglayout.entity';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([ParkingLayout])],
})
export class ParkingLayoutModule {}
