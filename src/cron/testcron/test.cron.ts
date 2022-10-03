import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { MemberService } from '../../services/member/member.service';
import { RandomService } from '../../services/random/random.service';

@Injectable()
export class TestCron {
  constructor(
    //   @InjectRepository(Member)
    //   private readonly memberRepository: Repository<Member>, // private readonly appService: AppService,
    private readonly memberService: MemberService,
    private readonly randomService: RandomService,
  ) {}

  @Cron(CronExpression.EVERY_MINUTE)
  async logMemberAmount() {
    const number = (await this.memberService.getAllMembers()).length;
    console.log(`There are ${number} members`);
  }
}
