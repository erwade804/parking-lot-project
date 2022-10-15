import { AppDataSource } from './../../data-source';
import { Reservation } from './../../entities/reservation/reservation.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Member } from '../../entities/member/member.entity';
import { Repository } from 'typeorm';
import * as moment from 'moment';

@Injectable()
export class ReservationService {
  constructor(
    @InjectRepository(Member)
    private readonly memberRepository: Repository<Member>,
    @InjectRepository(Reservation)
    private readonly reservationRepository: Repository<Reservation>,
  ) {
    memberRepository = AppDataSource.getRepository(Member);
    reservationRepository = AppDataSource.getRepository(Reservation);
  }

  async createReservation(
    startstop: {
      startTime: moment.Moment;
      endTime: moment.Moment;
    },
    member: Member,
  ): Promise<Reservation> {
    const reservation = this.reservationRepository.create();
    reservation.id = member.id;
    reservation.start_time = startstop.startTime;
    reservation.end_time = startstop.endTime;
    reservation.entry_time = moment(0);
    reservation.exit_time = moment(0);
    await reservation.save();
    console.log(reservation);
    return reservation;
  }

  async cancelReservation(reservationId: number): Promise<void> {
    await this.reservationRepository.delete({
      id: reservationId,
    });
  }

  async updateReservation(
    reservationId: number,
    startstop: {
      startTime: moment.Moment;
      endTime: moment.Moment;
    },
  ): Promise<Reservation> {
    const reservation = await this.reservationRepository.findOne({
      where: { id: reservationId },
    });
    reservation.start_time = startstop.startTime;
    reservation.end_time = startstop.endTime;
    await this.reservationRepository.update({ id: reservationId }, reservation);
    return reservation;
  }
}
