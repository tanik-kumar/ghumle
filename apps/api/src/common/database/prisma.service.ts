import { Injectable, Logger, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';

function createPgPool() {
  return new Pool({
    connectionString: process.env.DATABASE_URL ?? 'postgresql://ghumle:ghumle@localhost:5432/ghumle',
  });
}

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(PrismaService.name);
  private connected = false;
  private readonly pool: Pool;

  constructor() {
    const pool = createPgPool();
    super({
      adapter: new PrismaPg(pool),
    });
    this.pool = pool;
  }

  async onModuleInit() {
    try {
      await this.$connect();
      this.connected = true;
    } catch (error) {
      this.logger.warn('Database connection unavailable. Starting Ghumle API in degraded mode.');
      this.logger.debug(String(error));
    }
  }

  async onModuleDestroy() {
    if (this.connected) {
      await this.$disconnect();
    }

    await this.pool.end().catch(() => undefined);
  }
}
