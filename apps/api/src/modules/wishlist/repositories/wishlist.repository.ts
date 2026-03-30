import { Injectable } from '@nestjs/common';

import { PrismaService } from '../../../common/database/prisma.service';

@Injectable()
export class WishlistRepository {
  constructor(private readonly prisma: PrismaService) {}

  listByUser(userId: string) {
    return this.prisma.wishlistItem.findMany({
      where: { userId },
      include: {
        destination: true,
      },
      orderBy: {
        updatedAt: 'desc',
      },
    });
  }

  create(input: { userId: string; destinationId: string; targetBudget?: number; targetMonth?: number; targetYear?: number; note?: string }) {
    return this.prisma.wishlistItem.create({
      data: input,
      include: {
        destination: true,
      },
    });
  }

  update(id: string, userId: string, input: { targetBudget?: number; targetMonth?: number; targetYear?: number; note?: string }) {
    return this.prisma.wishlistItem.findFirst({ where: { id, userId } }).then((existing) => {
      if (!existing) {
        return null;
      }

      return this.prisma.wishlistItem.update({
        where: { id },
        data: input,
        include: {
          destination: true,
        },
      });
    });
  }

  remove(id: string, userId: string) {
    return this.prisma.wishlistItem.findFirst({ where: { id, userId } }).then((existing) => {
      if (!existing) {
        return null;
      }

      return this.prisma.wishlistItem.delete({
        where: { id },
      });
    });
  }
}
