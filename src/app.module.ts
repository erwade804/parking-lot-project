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
      host: 'sql5.freemysqlhosting.net',
      port: 3306,
      username: 'sql5520452',
      password: 'ymwP2d1XPQ',
      database: 'sql5520452',
      autoLoadEntities: true,
      synchronize: true,
    }),
    ScheduleModule.forRoot(),
    ServicesModule,
    CronModule,
    ControllersModule,
  ],
})
export class AppModule {}
