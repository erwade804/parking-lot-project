import { ApiProperty } from '@nestjs/swagger';

export class SubscriptionDto {
  @ApiProperty()
  spot: number;

  @ApiProperty()
  time: number;

  @ApiProperty()
  type: number;
}
