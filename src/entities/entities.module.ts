import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';
import { Member } from '../entities/member/member.entity';
import { Log } from './log/log.entity';

const importExports = [TypeOrmModule.forFeature([Member, Log])];

@Module({
  imports: importExports,
  exports: importExports,
})
export class EntitiesModule {}
