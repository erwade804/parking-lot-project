import { RandomService } from './../random/random.service';
import { Login } from '../../entities/login/login.entity';
import { AppDataSource } from './../../data-source';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Member } from '../../entities/member/member.entity';

@Injectable()
export class LoginService {
  constructor(
    @InjectRepository(Login)
    private readonly loginRepository: Repository<Login>,
    @InjectRepository(Member)
    private readonly memberRepository: Repository<Member>,
    private readonly randomService: RandomService,
  ) {
    this.loginRepository = AppDataSource.getRepository(Login);
    this.memberRepository = AppDataSource.getRepository(Member);
  }

  async getMemberByAuthToken(authToken: string): Promise<Member> {
    const loginEntry = await this.loginRepository.findOne({
      where: { authtoken: authToken },
    });
    const member = await this.memberRepository.findOne({
      where: { id: loginEntry.id },
    });
    return member;
  }

  async createAuthToken(member: Member): Promise<void> {
    const login = await this.loginRepository.findOne({
      where: { id: member.id },
    });
    login.authtoken = await this.randomService.randomToken();
    await this.loginRepository.update({ id: login.id }, login);
  }

  async createLogin(creds: {
    username: string;
    password: string;
    id: number;
  }): Promise<void> {
    console.log(creds);
    const login = this.loginRepository.create();
    login.username = creds.username;
    login.password = creds.password;
    login.id = creds.id;
    login.save();
  }
}
