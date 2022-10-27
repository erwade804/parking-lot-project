import { HttpException, HttpStatus } from '@nestjs/common';

export class ExistingUserException extends HttpException {
  constructor() {
    super('This user already exists.', HttpStatus.UNAUTHORIZED);
  }
}
