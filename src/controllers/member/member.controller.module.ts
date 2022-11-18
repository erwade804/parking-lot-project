import { LoginServiceModule } from './../../services/login/login.service.module';
import { AuthenticationTokenServiceModule } from './../../services/authentication/authentication.service.module';
import { Module } from '@nestjs/common';
import { MemberServiceModule } from '../../services/member/member.service.module';
import { MemberController } from './member.controller';

@Module({
  imports: [
    MemberServiceModule,
    AuthenticationTokenServiceModule,
    LoginServiceModule,
  ],
  controllers: [MemberController],
  providers: [],
})
export class MemberControllerModule {}
