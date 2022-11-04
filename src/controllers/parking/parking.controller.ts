import { Reservation } from './../../entities/reservation/reservation.entity';
import { MemberService } from './../../services/member/member.service';
import { ParkingSpotDto } from './../../dto/reservation';
import { AuthenticationTokenService } from './../../services/authentication/authentication.service';
import { ReservationService } from './../../services/reservation/reservation.service';
import { Body, Controller, Post, Req } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Request } from 'express';
import * as moment from 'moment';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Controller('/park')
export class ParkingController {
  constructor(
    private readonly memberService: MemberService,
    private readonly reservationService: ReservationService,
    private readonly authService: AuthenticationTokenService,
    @InjectRepository(Reservation)
    private readonly reservationRepository: Repository<Reservation>,
  ) {}

  @Post()
  @ApiBearerAuth()
  async park(
    @Req() request: Request,
    @Body() body: ParkingSpotDto,
  ): Promise<void> {
    // eslint-disable-next-line prettier/prettier
    if (request.headers.authorization !== 'Bearer park') { // change to something better later
      return;
    }

    // update active parking
    const member = await this.memberService.getMemberByPlate(body.plate);
    const res = await this.reservationService.nextReservation(member);
    await this.authService.extendAuthToken(member);
    if (res.entry_time.isBefore(moment(50))) {
      res.entry_time = moment();
    } else {
      res.exit_time = moment();
    }
    await this.reservationRepository.update({ book_id: res.book_id }, res);
  }
}
