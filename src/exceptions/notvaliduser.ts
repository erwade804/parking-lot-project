import { HttpException, HttpStatus } from '@nestjs/common';

export class UserDoesNotMatchReservationException extends HttpException {
  constructor() {
    super(
      'You do not own this reservation, please enter your own reservation.',
      HttpStatus.UNAUTHORIZED,
    );
  }
}
