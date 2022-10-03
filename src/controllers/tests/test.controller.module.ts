import { TestController } from './test.controller';
import { AuthenticationTokenServiceModule } from './../../services/authentication/authentication.service.module';
import { Module } from '@nestjs/common';
import { MemberServiceModule } from '../../services/member/member.service.module';

@Module({
  imports: [MemberServiceModule, AuthenticationTokenServiceModule],
  controllers: [TestController],
  providers: [],
})
export class TestControllerModule {}
