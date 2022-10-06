import { RandomService } from './../random/random.service';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Member } from '../../entities/member/member.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SeedService {
  seeded = false;
  constructor(
    @InjectRepository(Member)
    private readonly memberRepository: Repository<Member>,
    private readonly randomService: RandomService,
  ) {}

  async seedMemberDataBase(): Promise<void> {
    if (!this.seeded) {
      let member = this.memberRepository.create();
      member.name = 'Jerald';
      member.license_number = await this.randomService.randomPlate();
      await member.save();

      member = this.memberRepository.create();
      member.name = 'Karen';
      member.license_number = await this.randomService.randomPlate();
      await member.save();

      member = this.memberRepository.create();
      member.name = 'Zach';
      member.license_number = await this.randomService.randomPlate();
      await member.save();

      member = this.memberRepository.create();
      member.name = 'Paul';
      member.license_number = await this.randomService.randomPlate();
      await member.save();

      member = this.memberRepository.create();
      member.name = 'Lambert';
      member.license_number = await this.randomService.randomPlate();
      await member.save();

      member = this.memberRepository.create();
      member.name = 'Alice';
      member.license_number = await this.randomService.randomPlate();
      await member.save();

      member = this.memberRepository.create();
      member.name = 'Frank';
      member.license_number = await this.randomService.randomPlate();
      await member.save();

      this.seeded = true;
    }
  }
}
