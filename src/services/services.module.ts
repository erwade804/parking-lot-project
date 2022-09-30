import { SeedServiceModule } from './seed/seed.service.module';
import { Module } from '@nestjs/common';
import { MemberServiceModule } from './member/member.service.module';
import { RandomServiceModule } from './random/random.service.module';
import { AuthenticationTokenServiceModule } from './authentication/authentication.service.module';

@Module({
  imports: [
    MemberServiceModule,
    RandomServiceModule,
    SeedServiceModule,
    AuthenticationTokenServiceModule,
  ],
})
export class ServicesModule {}
