import { Module } from '@nestjs/common';
import { MemberControllerModule } from './member/member.controller.module';
import { SeedControllerModule } from './seed/seed.controller.module';

@Module({
  imports: [MemberControllerModule, SeedControllerModule],
})
export class ControllersModule {}
