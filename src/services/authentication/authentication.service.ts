import { Member } from './../../entities/member/member.entity';
import { Login } from './../../entities/login/login.entity';
import { RandomService } from './../random/random.service';
import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AppDataSource } from './../../data-source';
import * as moment from 'moment';

@Injectable()
export class AuthenticationTokenService {
  seeded = false;
  constructor(
    @InjectRepository(Login)
    private readonly loginRepository: Repository<Login>,
    @InjectRepository(Member)
    private readonly memberRepository: Repository<Member>,
    @Inject(forwardRef(() => RandomService))
    private readonly randomService: RandomService,
  ) {
    this.loginRepository = AppDataSource.getRepository(Login);
    this.memberRepository = AppDataSource.getRepository(Member);
  }

  async createAuthenticationToken(member: Member): Promise<string> {
    const memberLogin = await this.loginRepository.findOne({
      where: { id: member.id },
    });
    const authToken = `${await this.randomService.randomToken()}`;
    memberLogin.authtoken = authToken;
    await this.loginRepository.update(member.id, memberLogin);
    return authToken;
  }

  async crossCheckAuthToken(authToken: string): Promise<boolean> {
    const isTokenInDB = await this.loginRepository.count({
      where: { authtoken: authToken },
    });
    return isTokenInDB === 0;
  }

  async getMemberFromAuthToken(authToken: string): Promise<Member> {
    authToken = authToken.split(' ')[1];
    const memberId = await this.loginRepository.findOne({
      where: { authtoken: authToken },
    });
    if (!memberId) {
      return;
    }

    const member = await this.memberRepository.findOne({
      where: { id: memberId.id },
    });
    if (!member) {
      return;
    }
    return member;
  }

  async extendAuthToken(member: Member): Promise<void> {
    const login = await this.loginRepository.findOne({
      where: { id: member.id },
    });

    login.lastUpdated = moment();

    await this.loginRepository.update({ id: login.id }, login);
  }
}
