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
    // @InjectRepository(Member)
    // private readonly memberRepository: Repository<Member>,
    @InjectRepository(Reservation)
    private readonly reservationRepository: Repository<Reservation>,
  ) {
    // memberRepository = AppDataSource.getRepository(Member);
    reservationRepository = AppDataSource.getRepository(Reservation);
  }

  async createReservation(
    member: Member,
    start: moment.Moment,
    end: moment.Moment,
  ): Promise<Reservation> {
    const reservation = this.reservationRepository.create();
    reservation.id = member.id;
    reservation.start_time = start;
    reservation.end_time = end;
    reservation.entry_time = moment(0);
    reservation.exit_time = moment(0);
    await reservation.save();
    return reservation;
  }

  async cancelReservation(reservationId: number): Promise<void> {
    await this.reservationRepository.delete({
      book_id: reservationId,
    });
  }

  async getReservation(reservationId: number): Promise<Reservation> {
    return await this.reservationRepository.findOne({
      where: { book_id: reservationId },
    });
  }

  async getReservations(member: Member): Promise<Reservation[]> {
    const reservations = await this.reservationRepository.find({
      where: { id: member.id },
    });
    return reservations;
  }

  async getAllReservations(): Promise<Reservation[]> {
    return await this.reservationRepository.find({ where: { book_id: 1 } });
  }

  async updateReservation(
    reservation: Reservation,
    start: moment.Moment,
    end: moment.Moment,
  ): Promise<Reservation> {
    reservation.start_time = start;
    reservation.end_time = end;
    await this.reservationRepository.update(
      { book_id: reservation.book_id },
      reservation,
    );
    return reservation;
  }
}
