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

  async deleteAllMembers(): Promise<void> {
    const allMembers = await this.getAllMembers();
    allMembers.forEach(
      async (member) => await this.memberRepository.delete({ id: member.id }),
    );
  }

  async createMember(body: MemberCreationDto): Promise<Member> {
    const member = this.memberRepository.create();
    member.license_number = body.license_plate;
    member.first_name = body.first_name;
    member.last_name = body.last_name;
    member.VIN = body.VIN;
    member.email = body.email;
    member.phone_number = body.phone_number;
    await member.save();
    console.log(`Created member for ${member.first_name}`);
    // create login entity through login service
    // this is temperary for now
    console.log(member.id);
    const login = this.loginRepository.create();
    login.password = body.password;
    login.username = body.username;
    login.id = member.id;
    login.save();
    return member;
  }
}
