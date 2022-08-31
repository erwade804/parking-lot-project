import { Module } from '@nestjs/common';
import { TestCronModule } from './testcron/test.cron.module';

@Module({
  imports: [TestCronModule],
})
export class CronModule {}
