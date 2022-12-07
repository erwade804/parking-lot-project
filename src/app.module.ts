import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ControllersModule } from './controllers/controllers.module';
import { CronModule } from './cron/cron.module';
import { ServicesModule } from './services/services.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'db-mysql-nyc1-40864-do-user-11495862-0.b.db.ondigitalocean.com',
      port: 25060,
      username: 'doadmin',
      password: 'AVNS_G1PBt9YIuA0xCFid85c',
      database: 'defaultdb',
      synchronize: true,
      autoLoadEntities: true,
    }),
    ScheduleModule.forRoot(),
    ServicesModule,
    CronModule,
    ControllersModule,
  ],
})
export class AppModule {}
