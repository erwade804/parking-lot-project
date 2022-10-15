import { RandomService } from './../random/random.service';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Member } from '../../entities/member/member.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ReservationService {
  constructor(
    @InjectRepository(Member)
    private readonly memberRepository: Repository<Member>,
    private readonly randomService: RandomService,
  ) {}
}
