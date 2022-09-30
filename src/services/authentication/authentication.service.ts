import { RandomService } from './../random/random.service';
import { Injectable } from '@nestjs/common';
import { Member } from '../../entities/member/member.entity';

@Injectable()
export class AuthenticationTokenService {
  seeded = false;
  constructor(
    // @InjectRepository(Member)
    // private readonly memberRepository: Repository<Member>,
    private readonly randomService: RandomService,
  ) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async createAuthenticationToken(member: Member): Promise<string> {
    const authToken = `${await this.randomService.randomToken()}`;
    console.log(authToken);
    // save member's token to their entry
    return authToken;
  }
}
