import { ExistingUserException } from './../../exceptions/existinguser';
import { LoginService } from './../login/login.service';
import { MemberCreationDto } from './../../dto/member';
import { AppDataSource } from './../../data-source';
import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Member } from '../../entities/member/member.entity';

@Injectable()
export class MemberService {
  constructor(
    @Inject(forwardRef(() => LoginService))
    private readonly loginService: LoginService,
    @InjectRepository(Member)
    private readonly memberRepository: Repository<Member>,
  ) {
    this.memberRepository = AppDataSource.getRepository(Member);
  }

  async getAllMembers(): Promise<Member[]> {
    return await this.memberRepository.find({ where: {} });
  }

  async getMemberByPlate(plate_number: string): Promise<Member> {
    return await this.memberRepository.findOne({
      where: { license_number: plate_number },
    });
  }

  async getMemberById(memberId: number): Promise<Member> {
    return await this.memberRepository.findOne({
      where: { id: memberId },
    });
  }

  async deleteMember(member: Member): Promise<void> {
    await this.memberRepository.delete({ id: member.id });
  }

  async createMember(body: MemberCreationDto): Promise<Member> {
    if (this.loginService.userExists(body.username) || this.userExists(body)) {
      throw new ExistingUserException();
    }
    const member = this.memberRepository.create();
    member.license_number = body.license_plate;
    member.name = body.name;
    member.email = body.email;
    member.phone_number = body.phone_number;
    await member.save();

    const memberRetrieved = await this.memberRepository.findOne({
      where: {
        email: member.email,
        name: member.name,
        phone_number: member.phone_number,
      },
    });

    await this.loginService.createLogin({
      username: body.username,
      password: body.password,
      id: memberRetrieved.id,
    });

    return member;
  }

  async userExists(body: MemberCreationDto): Promise<boolean> {
    return (
      (await this.memberRepository.count({
        where: [
          { phone_number: body.phone_number },
          { email: body.email },
          { license_number: body.license_plate },
        ],
      })) === 1
    );
  }
}
