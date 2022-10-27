import { HttpException, HttpStatus } from '@nestjs/common';

export class StartAfterEndException extends HttpException {
  constructor() {
    super(
      'You cannot have the start of a reservation after the end of it.',
      HttpStatus.CONFLICT,
    );
  }
}
