import { Member } from './../../entities/member/member.entity';
import { Login } from './../../entities/login/login.entity';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';
import { AuthenticationTokenService } from './authentication.service';
import { Module } from '@nestjs/common';
import { RandomServiceModule } from '../random/random.service.module';

@Module({
  imports: [RandomServiceModule, TypeOrmModule.forFeature([Login, Member])],
  controllers: [],
  providers: [AuthenticationTokenService],
  exports: [AuthenticationTokenService],
})
export class AuthenticationTokenServiceModule {}
