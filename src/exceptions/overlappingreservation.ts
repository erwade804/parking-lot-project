import { HttpException, HttpStatus } from '@nestjs/common';

export class OverlappingReservationException extends HttpException {
  constructor() {
    super(
      'The spot you are trying to reserve is already reserved during part or all of this period.',
      HttpStatus.CONFLICT,
    );
  }
}
