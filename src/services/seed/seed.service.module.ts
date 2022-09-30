import { RandomServiceModule } from './../random/random.service.module';
import { SeedService } from './seed.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Member } from '../../entities/member/member.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Member]), RandomServiceModule],
  controllers: [],
  providers: [SeedService],
  exports: [SeedService],
})
export class SeedServiceModule {}
