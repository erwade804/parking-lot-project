import { ApiProperty } from '@nestjs/swagger';

export class ReservationDto {
  @ApiProperty()
  start_time: number;

  @ApiProperty()
  stop_time: number;
}

export class ParkingSpotDto {
  @ApiProperty()
  spot: number;

  @ApiProperty()
  plate: string;
}
