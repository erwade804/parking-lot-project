import { Subscription } from './../../entities/subscription/subscription.entity';
import { AuthenticationTokenService } from './../../services/authentication/authentication.service';
import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Request } from 'express';
import * as moment from 'moment';
import { SubscriptionService } from '../../services/subscription/subscription.service';
import { SubscriptionDto } from '../../dto/subscription';

@Controller('/subscribe')
export class SubscriptionController {
  constructor(
    private readonly subscriptionService: SubscriptionService,
    private readonly authService: AuthenticationTokenService,
  ) {}

  @Get('all')
  @ApiBearerAuth()
  async getSubscriptions(@Req() request: Request): Promise<Subscription[]> {
    const member = await this.authService.getMemberFromAuthToken(
      request.headers.authorization,
    );
    await this.authService.extendAuthToken(member);
    return await this.subscriptionService.getMemberSubscriptions(member);
  }

  @Post()
  @ApiBearerAuth()
  async subscribeMember(
    @Req() request: Request,
    @Body() body: SubscriptionDto,
  ): Promise<Subscription> {
    const member = await this.authService.getMemberFromAuthToken(
      request.headers.authorization,
    );
    await this.authService.extendAuthToken(member);
    await this.subscriptionService.subscribeMember(
      member,
      body.type,
      moment(body.time * 1000),
      body.spot,
    );
    return null;
  }
}
