import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { AppDataSource } from './../../data-source';
import { Login } from '../../entities/login/login.entity';
import { Repository } from 'typeorm';
import { MemberService } from '../../services/member/member.service';
import * as moment from 'moment';

@Injectable()
export class AuthCron {
  constructor(
    private readonly memberService: MemberService,
    @InjectRepository(Login)
    private readonly loginRepository: Repository<Login>,
  ) {
    this.loginRepository = AppDataSource.getRepository(Login);
  }

  @Cron(CronExpression.EVERY_MINUTE)
  async resetAuthLogin() {
    console.log('reset auth');
    const allMembers = await this.memberService.getAllMembers();
    const allLogins = await this.loginRepository.find();
    console.log(allLogins);
    Promise.all(
      allMembers.map(async (member) => {
        const login = allLogins.filter((login) => login.id === member.id)[0];
        if (
          login &&
          moment(login.lastUpdated).isBefore(moment().subtract(15, 'minutes'))
        ) {
          if (login.authtoken !== '') {
            console.log('removing auth token for member id:', login.id);
            login.authtoken = '';
            login.lastUpdated = moment();
            await this.loginRepository.update({ id: login.id }, login);
          }
        }
      }),
    );
  }
}
