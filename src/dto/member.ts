import { ApiProperty } from '@nestjs/swagger';

export class MemberCreationDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  plateNumber: string;
}

export class MemberByPlateDto {
  @ApiProperty()
  plateNumber: string;
}

export class MemberByIdDto {
  @ApiProperty()
  id: number;
}
