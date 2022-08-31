import { Module } from '@nestjs/common';
import { MemberServiceModule } from './member/member.service.module';
import { RandomServiceModule } from './random/random.service.module';

@Module({
  imports: [MemberServiceModule, RandomServiceModule],
})
export class ServicesModule {}
