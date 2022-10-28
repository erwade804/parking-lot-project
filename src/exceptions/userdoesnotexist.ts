import { HttpException, HttpStatus } from '@nestjs/common';

export class IncorrectPasswordOrUsernameException extends HttpException {
  constructor() {
    super(
      'Your username or password is incorrect, please try again.',
      HttpStatus.UNAUTHORIZED,
    );
  }
}
