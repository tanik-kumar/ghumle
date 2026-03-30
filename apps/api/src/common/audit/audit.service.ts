import { Injectable } from '@nestjs/common';

import { PrismaService } from '../database/prisma.service';

@Injectable()
export class AuditService {
  constructor(private readonly prisma: PrismaService) {}

  async log(userId: string | null, action: string, entityType: string, entityId?: string, metadata?: unknown) {
    return this.prisma.auditLog.create({
      data: {
        userId: userId ?? undefined,
        action,
        entityType,
        entityId,
        metadata: metadata as object | undefined,
      },
    });
  }
}
