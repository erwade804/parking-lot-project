import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventHistory } from './eventhistory.entity';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([EventHistory])],
})
export class EventHistorymodule {}
