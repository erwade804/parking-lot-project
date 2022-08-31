import { Module } from '@nestjs/common';
import { AppControllerModule } from './member/member.controller.module';

@Module({
  imports: [AppControllerModule],
})
export class ControllersModule {}
