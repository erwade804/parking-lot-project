import { HttpException, HttpStatus } from '@nestjs/common';

export class StartBeforeNowException extends HttpException {
  constructor() {
    super('You cannot start a reservation in the past.', HttpStatus.CONFLICT);
  }
}
