import { ApiProperty } from '@nestjs/swagger';

export class ReservationDto {
  @ApiProperty()
  start_time: number;

  @ApiProperty()
  stop_time: number;

  @ApiProperty()
  parking_spot: number;
}

export class ReservationTimeDto {
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

  @ApiProperty({ default: false })
  finalPart: boolean;
}
