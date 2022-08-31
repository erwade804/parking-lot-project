import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Log } from './log.entity';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([Log])],
})
export class LogModule {}
