import { LoginServiceModule } from './../login/login.service.module';
import { Login } from './../../entities/login/login.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Member } from '../../entities/member/member.entity';
import { MemberService } from './member.service';

@Module({
  imports: [TypeOrmModule.forFeature([Login, Member]), LoginServiceModule],
  controllers: [],
  providers: [MemberService],
  exports: [MemberService],
})
export class MemberServiceModule {}
