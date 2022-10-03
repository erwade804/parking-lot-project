import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Login } from './login.entity';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([Login])],
})
export class LoginModule {}
