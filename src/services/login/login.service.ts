import { InvalidLogoutSequenceException } from './../../exceptions/invalidlogoutsequence';
import { IncorrectPasswordOrUsernameException } from '../../exceptions/userdoesnotexist';
import { MemberService } from './../member/member.service';
import { RandomService } from './../random/random.service';
import { Login } from '../../entities/login/login.entity';
import { AppDataSource } from './../../data-source';
import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Member } from '../../entities/member/member.entity';
import * as moment from 'moment';

@Injectable()
export class LoginService {
  constructor(
    @InjectRepository(Login)
    private readonly loginRepository: Repository<Login>,
    @InjectRepository(Member)
    private readonly memberRepository: Repository<Member>,
    private readonly randomService: RandomService,
    @Inject(forwardRef(() => MemberService))
    private readonly memberService: MemberService,
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

  async createAuthToken(member: Member): Promise<string> {
    const login = await this.loginRepository.findOne({
      where: { id: member.id },
    });
    login.authtoken = await this.randomService.randomToken();
    login.lastUpdated = moment();
    await this.loginRepository.update({ id: login.id }, login);
    return login.authtoken;
  }

  async login(creds: { username: string; password: string }): Promise<string> {
    const login = await this.loginRepository.findOne({
      where: { username: creds.username, password: creds.password },
    });
    if (!login) {
      throw new IncorrectPasswordOrUsernameException();
    }
    const member = await this.memberService.getMemberById(login.id);
    return await this.createAuthToken(member);
  }

  async logout(member: Member): Promise<void> {
    const login = await this.loginRepository.findOne({
      where: { id: member.id },
    });
    if (!login) {
      throw new InvalidLogoutSequenceException();
    }
    login.authtoken = '';
    login.lastUpdated = moment();
    await this.loginRepository.update({ id: member.id }, login);
  }

  async createLogin(creds: {
    username: string;
    password: string;
    id: number;
  }): Promise<void> {
    const login = this.loginRepository.create();
    login.username = creds.username;
    login.password = creds.password;
    login.id = creds.id;
    await login.save();
  }

  async userExists(username: string): Promise<boolean> {
    return (
      (await this.loginRepository.count({ where: { username: username } })) ===
      1
    );
  }

  async deleteLogin(member: Member): Promise<void> {
    await this.loginRepository.delete({ id: member.id });
  }

  async passwordAllowed(password: string): Promise<boolean> {
    if (password.length < 7) return false;
    // can change the password requierments here
    return true;
  }
}
