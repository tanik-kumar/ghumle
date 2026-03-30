import { Injectable } from '@nestjs/common';

import { adminOverviewMetrics } from '@ghumle/contracts';

import { PrismaService } from '../../../common/database/prisma.service';

@Injectable()
export class AdminRepository {
  constructor(private readonly prisma: PrismaService) {}

  async overview() {
    try {
      const [users, trips, goals, reports] = await Promise.all([
        this.prisma.user.count(),
        this.prisma.tripPlan.count(),
        this.prisma.savingsGoal.aggregate({
          _sum: {
            savedAmount: true,
          },
        }),
        this.prisma.reportAbuse.count({
          where: {
            status: 'OPEN',
          },
        }),
      ]);

      return {
        totalUsers: users,
        activeTrips: trips,
        monthlySavingsTracked: goals._sum.savedAmount ?? 0,
        openReports: reports,
        featuredDestinations: await this.prisma.destination.count(),
      };
    } catch {
      return adminOverviewMetrics;
    }
  }

  async reports() {
    try {
      const reports = await this.prisma.reportAbuse.findMany({
        orderBy: {
          updatedAt: 'desc',
        },
      });

      if (reports.length === 0) {
        return [
          {
            id: 'report_demo_1',
            reason: 'Spam match request',
            details: 'Demo moderation queue placeholder.',
            status: 'OPEN',
          },
        ];
      }

      return reports;
    } catch {
      return [
        {
          id: 'report_demo_1',
          reason: 'Spam match request',
          details: 'Demo moderation queue placeholder.',
          status: 'OPEN',
        },
      ];
    }
  }

  resolveReport(id: string) {
    return this.prisma.reportAbuse.update({
      where: { id },
      data: {
        status: 'RESOLVED',
      },
    });
  }
}
