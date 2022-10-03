import { TestControllerModule } from './tests/test.controller.module';
import { Module } from '@nestjs/common';
import { MemberControllerModule } from './member/member.controller.module';
import { SeedControllerModule } from './seed/seed.controller.module';

@Module({
  imports: [MemberControllerModule, SeedControllerModule, TestControllerModule],
})
export class ControllersModule {}
