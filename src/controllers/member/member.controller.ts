import { Body, Controller, Get, Param, Post } from '@nestjs/common';
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

  @Get('/name=:name')
  async getByName(@Param('name') name: string): Promise<Member> {
    return await this.memberService.getMemberByName(name);
  }

  @Get('/id=:id')
  async getById(@Param('id') id: number): Promise<Member> {
    return await this.memberService.getMemberById(id);
  }

  @Post('/create')
  async postCreateMember(@Body() body: MemberCreationDto): Promise<Member> {
    return await this.memberService.createMember(body.name, body.plateNumber);
  }
}
