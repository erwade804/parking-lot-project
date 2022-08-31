import { ApiProperty } from '@nestjs/swagger';

export class MemberCreationDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  plateNumber: string;
}
