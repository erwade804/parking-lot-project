import { AuthenticationTokenService } from './authentication.service';
import { Module } from '@nestjs/common';
import { RandomServiceModule } from '../random/random.service.module';

@Module({
  imports: [RandomServiceModule],
  controllers: [],
  providers: [AuthenticationTokenService],
  exports: [AuthenticationTokenService],
})
export class AuthenticationTokenServiceModule {}
