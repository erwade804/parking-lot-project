import { LoginDto } from './../../dto/login';
import { LoginService } from './../../services/login/login.service';
import { AuthenticationTokenService } from './../../services/authentication/authentication.service';
import { Body, Controller, Post } from '@nestjs/common';

@Controller('/login')
export class LoginController {
  constructor(
    private readonly loginService: LoginService,
    private readonly authenticationTokenService: AuthenticationTokenService,
  ) {}

  @Post()
  async login(@Body() body: LoginDto): Promise<string> {
    return await this.loginService.login({
      password: body.password,
      username: body.username,
    });
  }
}
