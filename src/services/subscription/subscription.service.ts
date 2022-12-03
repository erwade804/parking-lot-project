import { OverlappingReservationException } from './../../exceptions/overlappingreservation';
import { Reservation } from './../../entities/reservation/reservation.entity';
import { Subscription } from './../../entities/subscription/subscription.entity';
import { Member } from './../../entities/member/member.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AppDataSource } from './../../data-source';
import * as moment from 'moment';
import { ReservationService } from '../reservation/reservation.service';

@Injectable()
export class SubscriptionService {
  constructor(
    @InjectRepository(Subscription)
    private readonly subscriptionRepository: Repository<Subscription>,
    @InjectRepository(Reservation)
    private readonly reservationRepository: Repository<Reservation>,
    private readonly reservationService: ReservationService,
  ) {
    this.subscriptionRepository = AppDataSource.getRepository(Subscription);
    this.reservationRepository = AppDataSource.getRepository(Reservation);
  }

  async subscribeMember(
    member: Member,
    type: number,
    startTime: moment.Moment,
    parkingSpot: number,
  ): Promise<void> {
    const sub = this.subscriptionRepository.create();
    sub.id = member.id;
    sub.type = type;
    sub.start_time = startTime;
    sub.parking_spot = parkingSpot;
    const res = this.reservationRepository.create();
    res.start_time = startTime;
    res.parking_spot = parkingSpot;
    res.id = sub.id;
    if (type === 1) {
      sub.end_time = moment(startTime.unix() * 1000).add(1, 'month');
      res.end_time = sub.end_time;
    } else if (type === 2) {
      sub.end_time = moment(startTime.unix() * 1000).add(3, 'months');
      res.end_time = sub.end_time;
    } else if (type === 3) {
      sub.end_time = moment(startTime.unix() * 1000).add(6, 'months');
      res.end_time = sub.end_time;
    }
    if (
      !(await this.reservationService.reservationAllowed(
        startTime,
        sub.end_time,
        parkingSpot,
      ))
    ) {
      throw new OverlappingReservationException();
    }
    sub.book_id = res.book_id;
    await res.save();
    sub.book_id = res.book_id;
    await sub.save();
  }

  async getMemberSubscriptions(member: Member): Promise<Subscription[]> {
    return this.subscriptionRepository.find({ where: { id: member.id } });
  }
}
