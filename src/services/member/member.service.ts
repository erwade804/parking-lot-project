import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Member } from '../../entities/member/member.entity';

@Injectable()
export class MemberService {
  constructor(
    @InjectRepository(Member)
    private readonly memberRepository: Repository<Member>,
  ) {}

  async getAllMembers(): Promise<Member[]> {
    return await this.memberRepository.find();
  }

  async getMemberByPlate(plate_number: string): Promise<Member> {
    return await this.memberRepository.findOne({
      where: { license_plate: plate_number },
    });
  }

  async getMemberById(memberId: number): Promise<Member> {
    return await this.memberRepository.findOne({
      where: { id: memberId },
    });
  }

  async createMember(
    memberName: string,
    license_plate: string,
  ): Promise<Member> {
    const member = this.memberRepository.create();
    member.license_plate = license_plate;
    member.name = memberName;
    await member.save();
    console.log(`Created member for ${member.name}`);
    return member;
  }
}
