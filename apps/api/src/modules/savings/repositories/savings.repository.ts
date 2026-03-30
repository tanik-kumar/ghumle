import { Injectable } from '@nestjs/common';

import { PrismaService } from '../../../common/database/prisma.service';

@Injectable()
export class SavingsRepository {
  constructor(private readonly prisma: PrismaService) {}

  listByUser(userId: string) {
    return this.prisma.savingsGoal.findMany({
      where: { userId },
      include: { deposits: true, tripPlan: true },
      orderBy: {
        updatedAt: 'desc',
      },
    });
  }

  createGoal(input: {
    userId: string;
    tripPlanId?: string;
    title: string;
    goalAmount: number;
    savedAmount: number;
    targetDate: Date;
    monthlyTarget: number;
    recommendation: string[];
  }) {
    return this.prisma.savingsGoal.create({
      data: {
        userId: input.userId,
        tripPlanId: input.tripPlanId,
        title: input.title,
        goalAmount: input.goalAmount,
        savedAmount: input.savedAmount,
        targetDate: input.targetDate,
        monthlyTarget: input.monthlyTarget,
        recommendation: input.recommendation,
      },
      include: { deposits: true },
    });
  }

  async addDeposit(goalId: string, userId: string, amount: number, note?: string) {
    await this.prisma.savingsDeposit.create({
      data: {
        goalId,
        amount,
        note,
      },
    });

    await this.prisma.savingsGoal.updateMany({
      where: { id: goalId, userId },
      data: {
        savedAmount: {
          increment: amount,
        },
      },
    });

    return this.prisma.savingsGoal.findFirst({
      where: { id: goalId, userId },
      include: { deposits: true, tripPlan: true },
    });
  }
}
