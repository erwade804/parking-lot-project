import { LoginServiceModule } from './../login/login.service.module';
import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Member } from '../../entities/member/member.entity';
import { MemberService } from './member.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Member]),
    forwardRef(() => LoginServiceModule),
  ],
  controllers: [],
  providers: [MemberService],
  exports: [MemberService],
})
export class MemberServiceModule {}
