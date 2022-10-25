import { AppDataSource } from './../../data-source';
import { Reservation } from './../../entities/reservation/reservation.entity';
import { Repository } from 'typeorm';
import { ReservationService } from './../../services/reservation/reservation.service';
import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { MemberService } from '../../services/member/member.service';
import { RandomService } from '../../services/random/random.service';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TestCron {
  constructor(
    private readonly memberService: MemberService,
    private readonly randomService: RandomService,
    private readonly reservationService: ReservationService,
    @InjectRepository(Reservation)
    private readonly reservationRepository: Repository<Reservation>,
  ) {
    reservationRepository = AppDataSource.getRepository(Reservation);
  }

  @Cron(CronExpression.EVERY_MINUTE)
  async logMemberAmount() {
    const number = (await this.memberService.getAllMembers()).length;
    console.log(`There are ${number} members`);
  }

  // @Cron(CronExpression.EVERY_5_SECONDS)
  // async getReservations() {
  //   console.log(await this.reservationRepository.find());
  // }
}
