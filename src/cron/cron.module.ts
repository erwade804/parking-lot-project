import { Module } from '@nestjs/common';
import { AuthCronModule } from './auth/auth.cron.service.module';
import { TestCronModule } from './testcron/test.cron.module';

@Module({
  imports: [TestCronModule, AuthCronModule],
})
export class CronModule {}
