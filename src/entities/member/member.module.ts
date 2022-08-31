import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Member } from './member.entity';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([Member])],
})
export class MemberModule {}
