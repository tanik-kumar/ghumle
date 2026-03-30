import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { CurrentUser } from '../../common/security/current-user.decorator';
import { Public } from '../../common/security/public.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateMatchRequestDto } from './dto/create-match-request.dto';
import { UpdateMatchProfileDto } from './dto/update-match-profile.dto';
import { MatchingService } from './matching.service';

@ApiTags('Matching')
@Controller({ path: 'matches', version: '1' })
export class MatchingController {
  constructor(private readonly matchingService: MatchingService) {}

  @Public()
  @Get('suggestions')
  suggestions() {
    return this.matchingService.suggestions();
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  profile(@CurrentUser() user: { sub: string }) {
    return this.matchingService.getProfile(user.sub);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post('profile')
  upsertProfile(@CurrentUser() user: { sub: string }, @Body() dto: UpdateMatchProfileDto) {
    return this.matchingService.upsertProfile(user.sub, dto);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('requests')
  requests(@CurrentUser() user: { sub: string }) {
    return this.matchingService.listRequests(user.sub);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post('requests')
  createRequest(@CurrentUser() user: { sub: string }, @Body() dto: CreateMatchRequestDto) {
    return this.matchingService.createRequest(user.sub, dto);
  }
}
