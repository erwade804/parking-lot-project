import { SeedService } from './../../services/seed/seed.service';
import { Controller, Post } from '@nestjs/common';

@Controller('/seed')
export class SeedController {
  constructor(private readonly seedService: SeedService) {}

  @Post()
  async postCreateMembers(): Promise<void> {
    await this.seedService.seedMemberDataBase();
  }
}
