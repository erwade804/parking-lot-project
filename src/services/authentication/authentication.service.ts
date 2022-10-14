import { Login } from './../../entities/login/login.entity';
import { RandomService } from './../random/random.service';
import { Injectable } from '@nestjs/common';
import { Member } from '../../entities/member/member.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AppDataSource } from './../../data-source';

@Injectable()
export class AuthenticationTokenService {
  seeded = false;
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
}
