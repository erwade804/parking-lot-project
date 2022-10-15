import { Member } from './../../entities/member/member.entity';
import { Login } from './../../entities/login/login.entity';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';
import { AuthenticationTokenService } from './authentication.service';
import { forwardRef, Module } from '@nestjs/common';
import { RandomServiceModule } from '../random/random.service.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Login, Member]),
    forwardRef(() => RandomServiceModule),
  ],
  controllers: [],
  providers: [AuthenticationTokenService],
  exports: [AuthenticationTokenService],
})
export class AuthenticationTokenServiceModule {}
