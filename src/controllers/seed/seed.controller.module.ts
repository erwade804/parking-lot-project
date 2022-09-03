import { SeedServiceModule } from './../../services/seed/seed.service.module';
import { Module } from '@nestjs/common';
import { SeedController } from './seed.controller';

@Module({
  imports: [SeedServiceModule],
  controllers: [SeedController],
  providers: [],
})
export class SeedControllerModule {}
