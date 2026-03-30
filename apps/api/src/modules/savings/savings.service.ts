import { Injectable } from '@nestjs/common';

import { calculateSavingsPlan } from '@ghumle/contracts';

import { AuditService } from '../../common/audit/audit.service';
import { CreateSavingsDepositDto } from './dto/create-savings-deposit.dto';
import { CreateSavingsGoalDto } from './dto/create-savings-goal.dto';
import { SavingsRepository } from './repositories/savings.repository';

@Injectable()
export class SavingsService {
  constructor(
    private readonly savingsRepository: SavingsRepository,
    private readonly auditService: AuditService,
  ) {}

  listMine(userId: string) {
    return this.savingsRepository.listByUser(userId);
  }

  async create(userId: string, dto: CreateSavingsGoalDto) {
    const result = calculateSavingsPlan({
      goalAmount: dto.goalAmount,
      savedAmount: dto.savedAmount ?? 0,
      targetDate: new Date(dto.targetDate).toISOString(),
    });

    const goal = await this.savingsRepository.createGoal({
      userId,
      tripPlanId: dto.tripPlanId,
      title: dto.title,
      goalAmount: dto.goalAmount,
      savedAmount: dto.savedAmount ?? 0,
      targetDate: new Date(dto.targetDate),
      monthlyTarget: result.monthlySavingsNeeded,
      recommendation: result.recommendations,
    });

    await this.auditService.log(userId, 'savings-goal.created', 'SavingsGoal', goal.id, dto);
    return {
      ...goal,
      savingsProjection: result,
    };
  }

  async addDeposit(userId: string, goalId: string, dto: CreateSavingsDepositDto) {
    const goal = await this.savingsRepository.addDeposit(goalId, userId, dto.amount, dto.note);
    await this.auditService.log(userId, 'savings-deposit.created', 'SavingsDeposit', goalId, dto);
    return goal;
  }
}
