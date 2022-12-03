import { ParkingLayout } from './../../entities/parking_layout/parkinglayout.entity';
import { Reservation } from './../../entities/reservation/reservation.entity';
import { MemberService } from './../../services/member/member.service';
import { ParkingSpotDto } from './../../dto/reservation';
import { AuthenticationTokenService } from './../../services/authentication/authentication.service';
import { ReservationService } from './../../services/reservation/reservation.service';
import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Req,
} from '@nestjs/common';
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
    @InjectRepository(ParkingLayout)
    private readonly parkingRepository: Repository<ParkingLayout>,
  ) {}

  @Post()
  @ApiBearerAuth()
  async park(
    @Req() request: Request,
    @Body() body: ParkingSpotDto,
  ): Promise<void> {
    let flag = true;
    if (request.headers.authorization !== 'Bearer park') {
      return;
    }

    const parkingSpot = await this.parkingRepository.findOne({
      where: { parking_id: body.spot },
    });
    const member = await this.memberService.getMemberByPlate(body.plate);
    const res = await this.reservationService.nextReservation(member);
    await this.authService.extendAuthToken(member);
    if (res.entry_time.isBefore(moment(50))) {
      res.entry_time = moment();
    } else {
      if (body.finalPart) {
        res.exit_time = moment();
        await this.reservationService.finishReservation(res);
        flag = false;
      }
    }
    await this.parkingRepository.update(
      { parking_id: body.spot },
      {
        occupied: !parkingSpot.occupied,
      },
    );
    if (flag) {
      await this.reservationRepository.update({ book_id: res.book_id }, res);
    }
  }

  @Get('floor/:floor')
  async getFloorParking(
    @Param('floor', ParseIntPipe) floor: number,
  ): Promise<ParkingLayout[]> {
    return await this.parkingRepository.find({ where: { level: floor } });
  }
}
