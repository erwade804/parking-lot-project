import { HttpException, HttpStatus } from '@nestjs/common';

export class NotLoggedInException extends HttpException {
  constructor() {
    super('You are not logged in, please log in.', HttpStatus.UNAUTHORIZED);
  }
}
