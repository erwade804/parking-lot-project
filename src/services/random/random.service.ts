import { AuthenticationTokenService } from './../authentication/authentication.service';
import { Login } from './../../entities/login/login.entity';
import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { randomInt } from 'crypto';
import { Member } from '../../entities/member/member.entity';
import { Repository } from 'typeorm';
import {
  legalPlateLetters,
  legalTokenCharacters,
} from '../../constants/random';

@Injectable()
export class RandomService {
  constructor(
    @InjectRepository(Member)
    private readonly memberRepository: Repository<Member>,
    @InjectRepository(Login)
    private readonly loginRepository: Repository<Login>,
    @Inject(forwardRef(() => AuthenticationTokenService))
    private readonly authenticationTokenService: AuthenticationTokenService,
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
      where: { license_number: plateNumber },
    });
    if (exists[1] === 1) {
      return false;
    }
    return plateNumber.charAt(0) !== ' ' && plateNumber.charAt(0) !== ' ';
  }

  async randomToken(): Promise<string> {
    let string = '';
    for (let i = 0; i < 30; i++) {
      string += legalTokenCharacters.charAt(
        randomInt(0, legalTokenCharacters.length),
      );
    }
    return this.checkCompliantToken(string) &&
      (await this.authenticationTokenService.crossCheckAuthToken(string))
      ? string
      : this.randomToken();
  }

  async checkCompliantToken(token: string): Promise<boolean> {
    // check if token exists already, if it does, return false
    return (
      (await this.loginRepository.findOne({
        where: { authtoken: token },
      })) !== undefined
    );
  }
}
