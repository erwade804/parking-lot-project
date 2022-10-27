import { HttpException, HttpStatus } from '@nestjs/common';

export class InvalidLogoutSequenceException extends HttpException {
  constructor() {
    super('You are not logged in.', HttpStatus.UNAUTHORIZED);
  }
}
