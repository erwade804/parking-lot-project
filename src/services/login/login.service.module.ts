import { RandomServiceModule } from './../random/random.service.module';
import { LoginService } from './login.service';
import { Login } from './../../entities/login/login.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Member } from '../../entities/member/member.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Login, Member]), RandomServiceModule],
  controllers: [],
  providers: [LoginService],
  exports: [LoginService],
})
export class LoginServiceModule {}
