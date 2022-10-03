import { RandomServiceModule } from './../../services/random/random.service.module';
import { Module } from '@nestjs/common';
import { MemberServiceModule } from '../../services/member/member.service.module';
import { TestCron } from './test.cron';

@Module({
  imports: [MemberServiceModule, RandomServiceModule],
  providers: [TestCron],
  exports: [TestCron],
})
export class TestCronModule {}
