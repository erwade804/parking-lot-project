import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { AppDataSource } from './../../data-source';
import { Login } from '../../entities/login/login.entity';
import { Member } from '../../entities/member/member.entity';
import { Repository } from 'typeorm';
import { MemberService } from '../../services/member/member.service';
import { RandomService } from '../../services/random/random.service';
import * as moment from 'moment';

@Injectable()
export class AuthCron {
  constructor(
    //   @InjectRepository(Member)
    //   private readonly memberRepository: Repository<Member>, // private readonly appService: AppService,
    private readonly memberService: MemberService,
    private readonly randomService: RandomService,
    @InjectRepository(Login)
    private readonly loginRepository: Repository<Login>,
    @InjectRepository(Member)
    private readonly memberRepository: Repository<Member>,
  ) {
    this.loginRepository = AppDataSource.getRepository(Login);
    this.memberRepository = AppDataSource.getRepository(Member);
  }

  @Cron(CronExpression.EVERY_MINUTE)
  async resetAuthLogin() {
    console.log('reset auth');
    const allMembers = await this.memberService.getAllMembers();
    Promise.all(
      allMembers.map(async (member) => {
        const login = await this.loginRepository.findOne({
          where: { id: member.id },
        });
        if (
          moment(login.lastUpdated).isBefore(moment().subtract(15, 'minutes'))
        ) {
          console.log('updating', login.id);
          login.authtoken = '';
          login.lastUpdated = moment();
          await this.loginRepository.update({ id: login.id }, login);
        }
      }),
    );
  }
}
