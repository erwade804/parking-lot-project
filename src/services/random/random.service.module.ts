import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Member } from '../../entities/member/member.entity';
import { RandomService } from './random.service';

@Module({
  imports: [TypeOrmModule.forFeature([Member])],
  controllers: [],
  providers: [RandomService],
  exports: [RandomService],
})
export class RandomServiceModule {}
