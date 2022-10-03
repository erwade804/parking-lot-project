import { ApiProperty } from '@nestjs/swagger';

export class MemberCreationDto {
  @ApiProperty()
  first_name: string;

  @ApiProperty()
  last_name: string;

  @ApiProperty()
  license_plate: string;

  @ApiProperty()
  VIN: string;

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
