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
      member.first_name = 'Jerald';
      member.license_number = await this.randomService.randomPlate();
      await member.save();

      member = this.memberRepository.create();
      member.first_name = 'Karen';
      member.license_number = await this.randomService.randomPlate();
      await member.save();

      member = this.memberRepository.create();
      member.first_name = 'Zach';
      member.license_number = await this.randomService.randomPlate();
      await member.save();

      member = this.memberRepository.create();
      member.first_name = 'Paul';
      member.license_number = await this.randomService.randomPlate();
      await member.save();

      member = this.memberRepository.create();
      member.first_name = 'Lambert';
      member.license_number = await this.randomService.randomPlate();
      await member.save();

      member = this.memberRepository.create();
      member.first_name = 'Alice';
      member.license_number = await this.randomService.randomPlate();
      await member.save();

      member = this.memberRepository.create();
      member.first_name = 'Frank';
      member.license_number = await this.randomService.randomPlate();
      await member.save();

      this.seeded = true;
    }
  }
}
