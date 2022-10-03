import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';
import { Member } from '../entities/member/member.entity';
import { Log } from './log/log.entity';
import { Login } from './login/login.entity';
import { Reservation } from './reservation/reservation.entity';

export const entities = [Member, Login, Reservation, Log];
const importExports = [TypeOrmModule.forFeature(entities)];

@Module({
  imports: importExports,
  exports: importExports,
})
export class EntitiesModule {}
