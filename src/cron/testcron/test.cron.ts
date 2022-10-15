import { ReservationService } from './../../services/reservation/reservation.service';
import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { MemberService } from '../../services/member/member.service';
import { RandomService } from '../../services/random/random.service';

@Injectable()
export class TestCron {
  constructor(
    private readonly memberService: MemberService,
    private readonly randomService: RandomService,
    private readonly reservationService: ReservationService,
  ) {}

  @Cron(CronExpression.EVERY_MINUTE)
  async logMemberAmount() {
    const number = (await this.memberService.getAllMembers()).length;
    console.log(`There are ${number} members`);
  }
}
