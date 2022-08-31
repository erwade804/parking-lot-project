import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { randomInt } from 'crypto';
import { Member } from '../../entities/member/member.entity';
import { Repository } from 'typeorm';
import { legalPlateLetters } from '../../constants/random';

@Injectable()
export class RandomService {
  constructor(
    @InjectRepository(Member)
    private readonly memberRepository: Repository<Member>,
  ) {}
  async randomPlate(): Promise<string> {
    let plateNumber = '';
    while (plateNumber.length < 8) {
      plateNumber += legalPlateLetters.charAt(
        randomInt(0, legalPlateLetters.length),
      );
    }
    return (await this.compliantPlate(plateNumber))
      ? plateNumber
      : this.randomPlate();
  }

  async compliantPlate(plateNumber: string): Promise<boolean> {
    const exists = await this.memberRepository.findAndCount({
      where: { license_plate: plateNumber },
    });
    if (exists[1] === 1) {
      return false;
    }
    return plateNumber.charAt(0) !== ' ' && plateNumber.charAt(0) !== ' ';
  }
}
