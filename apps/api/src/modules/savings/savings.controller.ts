import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { CurrentUser } from '../../common/security/current-user.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateSavingsDepositDto } from './dto/create-savings-deposit.dto';
import { CreateSavingsGoalDto } from './dto/create-savings-goal.dto';
import { SavingsService } from './savings.service';

@ApiTags('Savings')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller({ path: 'savings-goals', version: '1' })
export class SavingsController {
  constructor(private readonly savingsService: SavingsService) {}

  @Get()
  listMine(@CurrentUser() user: { sub: string }) {
    return this.savingsService.listMine(user.sub);
  }

  @Post()
  create(@CurrentUser() user: { sub: string }, @Body() dto: CreateSavingsGoalDto) {
    return this.savingsService.create(user.sub, dto);
  }

  @Post(':id/deposits')
  addDeposit(
    @CurrentUser() user: { sub: string },
    @Param('id') id: string,
    @Body() dto: CreateSavingsDepositDto,
  ) {
    return this.savingsService.addDeposit(user.sub, id, dto);
  }
}
