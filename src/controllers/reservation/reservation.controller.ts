import { UserDoesNotMatchReservationException } from './../../exceptions/notvaliduser';
import { ReservationDto } from './../../dto/reservation';
import { Reservation } from './../../entities/reservation/reservation.entity';
import { AuthenticationTokenService } from './../../services/authentication/authentication.service';
import { ReservationService } from './../../services/reservation/reservation.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Req,
} from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Request } from 'express';
import * as moment from 'moment';

@Controller('/reservation')
export class ReservationController {
  constructor(
    private readonly reservationService: ReservationService,
    private readonly authService: AuthenticationTokenService,
  ) {}

  @Delete(':reservationId')
  @ApiBearerAuth()
  async removeReservation(
    @Req() request: Request,
    @Param('reservationId', ParseIntPipe) reservationId: number,
  ): Promise<void> {
    const member = await this.authService.getMemberFromAuthToken(
      request.headers.authorization,
    );
    const reservation = await this.reservationService.getReservation(
      reservationId,
    );
    if (reservation.id === member.id) {
      await this.reservationService.cancelReservation(reservationId);
    }
    await this.authService.extendAuthToken(member);
  }

  @Get()
  @ApiBearerAuth()
  async getReservations(@Req() request: Request): Promise<Reservation[]> {
    const member = await this.authService.getMemberFromAuthToken(
      request.headers.authorization,
    );
    await this.authService.extendAuthToken(member);
    return await this.reservationService.getReservations(member);
  }

  @Patch(':reservationId')
  @ApiBearerAuth()
  async updateReservation(
    @Req() request: Request,
    @Param('reservationId', ParseIntPipe) reservationId: number,
    @Body() reservationDto: ReservationDto,
  ): Promise<void> {
    const member = await this.authService.getMemberFromAuthToken(
      request.headers.authorization,
    );
    const reservation = await this.reservationService.getReservation(
      reservationId,
    );
    if (reservation.id !== member.id) {
      throw new UserDoesNotMatchReservationException();
    }
    await this.reservationService.updateReservation(
      reservation,
      moment(reservationDto.start_time),
      moment(reservationDto.stop_time),
    );
    await this.authService.extendAuthToken(member);
  }

  @Post('/create')
  @ApiBearerAuth()
  async createReservation(
    @Req() request: Request,
    @Body() reserve: ReservationDto,
  ): Promise<Reservation> {
    const member = await this.authService.getMemberFromAuthToken(
      request.headers.authorization,
    );
    console.log(member);
    await this.authService.extendAuthToken(member);
    return await this.reservationService.createReservation(
      member,
      moment(reserve.start_time * 1000),
      moment(reserve.stop_time * 1000),
    );
  }
}
