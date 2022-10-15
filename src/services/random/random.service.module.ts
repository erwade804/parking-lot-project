import { AuthenticationTokenServiceModule } from './../authentication/authentication.service.module';
import { Login } from './../../entities/login/login.entity';
import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Member } from '../../entities/member/member.entity';
import { RandomService } from './random.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Member, Login]),
    forwardRef(() => AuthenticationTokenServiceModule),
  ],
  controllers: [],
  providers: [RandomService],
  exports: [RandomService],
})
export class RandomServiceModule {}
