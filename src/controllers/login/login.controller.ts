import { LoginDto } from './../../dto/login';
import { LoginService } from './../../services/login/login.service';
import { AuthenticationTokenService } from './../../services/authentication/authentication.service';
import { Body, Controller, Post, Req } from '@nestjs/common';
import { Request } from 'express';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('/account')
export class LoginController {
  constructor(
    private readonly loginService: LoginService,
    private readonly authService: AuthenticationTokenService,
  ) {}

  @Post('/login')
  async login(@Body() body: LoginDto): Promise<string> {
    return await this.loginService.login({
      password: body.password,
      username: body.username,
    });
  }

  @Post('/logout')
  @ApiBearerAuth()
  async logout(@Req() request: Request): Promise<void> {
    const member = await this.authService.getMemberFromAuthToken(
      request.headers.authorization,
    );
    await this.loginService.logout(member);
  }

  @Post('/authext')
  @ApiBearerAuth()
  async extendAuthToken(@Req() request: Request): Promise<void> {
    const member = await this.authService.getMemberFromAuthToken(
      request.headers.authorization,
    );
    await this.authService.extendAuthToken(member);
  }
}
