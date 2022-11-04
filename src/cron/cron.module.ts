import { Module } from '@nestjs/common';
import { AuthCronModule } from './auth/auth.cron.service.module';

@Module({
  imports: [AuthCronModule],
})
export class CronModule {}
