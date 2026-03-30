import { Injectable } from '@nestjs/common';

import { PrismaService } from '../../common/database/prisma.service';

@Injectable()
export class HealthService {
  constructor(private readonly prisma: PrismaService) {}

  async status() {
    let database = 'ok';

    try {
      await this.prisma.$queryRaw`SELECT 1`;
    } catch {
      database = 'degraded';
    }

    return {
      service: 'ghumle-api',
      status: database === 'ok' ? 'healthy' : 'degraded',
      time: new Date().toISOString(),
      checks: {
        database,
        redis: process.env.REDIS_URL ? 'configured' : 'not-configured',
      },
    };
  }
}
