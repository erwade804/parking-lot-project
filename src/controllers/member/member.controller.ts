import { AuthenticationTokenService } from './../../services/authentication/authentication.service';
import { MemberByPlateDto, MemberByIdDto } from './../../dto/member';
import { Body, Controller, Get, Post, Delete, Req } from '@nestjs/common';
import { Member } from '../../entities/member/member.entity';
import { MemberCreationDto } from '../../dto/member';
import { MemberService } from '../../services/member/member.service';
import { Request } from 'express';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('/member')
export class MemberController {
  constructor(
    private readonly memberService: MemberService,
    private readonly authenticationTokenService: AuthenticationTokenService,
  ) {}

  // example bearer token authentication with id checks,
  // credentials will be different for each endpoint, don't count on it being body.id
  @Delete()
  @ApiBearerAuth()
  async deleteMember(
    @Body() body: MemberByIdDto,
    @Req() request: Request,
  ): Promise<void> {
    const member = await this.authenticationTokenService.getMemberFromAuthToken(
      request.headers.authorization,
    );
    if (member.id === body.id) {
      await this.memberService.deleteMember(member);
    }
  }

  @Get('/all')
  @ApiBearerAuth()
  async getAllMembers(@Req() request: Request): Promise<Member[]> {
    const member = await this.authenticationTokenService.getMemberFromAuthToken(
      request.headers.authorization,
    );
    if (member) return await this.memberService.getAllMembers();
  }

  @Get('/id')
  async getById(@Body() body: MemberByIdDto): Promise<Member> {
    return await this.memberService.getMemberById(body.id);
  }

  @Get('/plate')
  async getByPlate(@Body() body: MemberByPlateDto): Promise<Member> {
    return await this.memberService.getMemberByPlate(body.plateNumber);
  }

  @Post('/create')
  async postCreateMember(@Body() body: MemberCreationDto): Promise<Member> {
    return await this.memberService.createMember(body);
  }
}
