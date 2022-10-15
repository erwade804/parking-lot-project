import { Login } from './../../entities/login/login.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthCron } from './auth.cron.service';
import { Module } from '@nestjs/common';
import { MemberServiceModule } from '../../services/member/member.service.module';

@Module({
  imports: [MemberServiceModule, TypeOrmModule.forFeature([Login])],
  providers: [AuthCron],
  exports: [AuthCron],
})
export class AuthCronModule {}
