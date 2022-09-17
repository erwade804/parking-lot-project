import { MemberByPlateDto, MemberByIdDto } from './../../dto/member';
import { Body, Controller, Get, Post, Delete } from '@nestjs/common';
import { Member } from '../../entities/member/member.entity';
import { MemberCreationDto } from '../../dto/member';
import { MemberService } from '../../services/member/member.service';

@Controller('/member')
export class MemberController {
  constructor(private readonly memberService: MemberService) {}

  @Get('/all')
  async getAllMembers(): Promise<Member[]> {
    return await this.memberService.getAllMembers();
  }

  @Get('/id')
  async getById(@Body() body: MemberByIdDto): Promise<Member> {
    return await this.memberService.getMemberById(body.id);
  }
  @Get('/plate')
  async getByPlate(@Body() body: MemberByPlateDto): Promise<Member> {
    return await this.memberService.getMemberByPlate(body.plateNumber);
  }
  @Delete('/all')
  async deleteAll(): Promise<void> {
    await this.memberService.deleteAllMembers();
  }

  @Post('/create')
  async postCreateMember(@Body() body: MemberCreationDto): Promise<Member> {
    return await this.memberService.createMember(body.name, body.plateNumber);
  }
}
