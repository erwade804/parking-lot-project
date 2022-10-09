import { ApiProperty } from '@nestjs/swagger';

export class MemberCreationDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  license_plate: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  phone_number: string;

  @ApiProperty()
  username: string;

  @ApiProperty()
  password: string;
}

export class MemberByPlateDto {
  @ApiProperty()
  plateNumber: string;
}

export class MemberByIdDto {
  @ApiProperty()
  id: number;
}
