import { Module } from '@nestjs/common';
import { MemberServiceModule } from '../../services/member/member.service.module';
import { MemberController } from './member.controller';

@Module({
  imports: [MemberServiceModule],
  controllers: [MemberController],
  providers: [],
})
export class AppControllerModule {}
