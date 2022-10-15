import { LoginServiceModule } from './../../services/login/login.service.module';
import { LoginController } from './login.controller';
import { AuthenticationTokenServiceModule } from './../../services/authentication/authentication.service.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [LoginServiceModule, AuthenticationTokenServiceModule],
  controllers: [LoginController],
  providers: [],
})
export class LoginControllerModule {}
