import { LoginService } from './../login/login.service';
import { MemberCreationDto } from './../../dto/member';
import { Login } from '../../entities/login/login.entity';
import { AppDataSource } from './../../data-source';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Member } from '../../entities/member/member.entity';

@Injectable()
export class MemberService {
  constructor(
    @InjectRepository(Login)
    private readonly loginRepository: Repository<Login>,
    @InjectRepository(Member)
    private readonly memberRepository: Repository<Member>,
    private readonly loginService: LoginService,
  ) {
    this.loginRepository = AppDataSource.getRepository(Login);
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

    console.log(`Created member for ${member.name}`);
    return member;
  }
}
