import { MemberServiceModule } from './../member/member.service.module';
import { RandomServiceModule } from './../random/random.service.module';
import { LoginService } from './login.service';
import { Login } from './../../entities/login/login.entity';
import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Member } from '../../entities/member/member.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Login, Member]),
    RandomServiceModule,
    forwardRef(() => MemberServiceModule),
  ],
  providers: [LoginService],
  exports: [LoginService],
})
export class LoginServiceModule {}
