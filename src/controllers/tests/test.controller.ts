import { AuthenticationTokenService } from './../../services/authentication/authentication.service';
import { Controller, Post } from '@nestjs/common';
import { MemberService } from '../../services/member/member.service';

// the test controller is used to test services that may not be directly tied to an endpoint

@Controller('/test')
export class TestController {
  constructor(
    private readonly memberService: MemberService,
    private readonly authenticationTokenService: AuthenticationTokenService,
  ) {}

  @Post('/auth')
  async testAuth(): Promise<string> {
    const member = await (await this.memberService.getAllMembers()).at(0);
    console.log(member);
    return await this.authenticationTokenService.createAuthenticationToken(
      member,
    );
  }
}
