import { AuthenticationTokenService } from './../../services/authentication/authentication.service';
import { Controller } from '@nestjs/common';

@Controller('/login')
export class LoginController {
  constructor(
    private readonly authenticationTokenService: AuthenticationTokenService,
  ) {}
}
