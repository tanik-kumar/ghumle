import { Injectable } from '@nestjs/common';

import { PrismaService } from '../../../common/database/prisma.service';

@Injectable()
export class UsersRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
      include: { profile: true, adminUser: true },
    });
  }

  async findById(id: string) {
    return this.prisma.user.findUnique({
      where: { id },
      include: { profile: true, adminUser: true },
    });
  }

  async createUser(input: { email: string; passwordHash: string; fullName: string }) {
    return this.prisma.user.create({
      data: {
        email: input.email,
        passwordHash: input.passwordHash,
        profile: {
          create: {
            fullName: input.fullName,
            preferredTravelStyles: [],
          },
        },
      },
      include: { profile: true },
    });
  }

  async updateProfile(userId: string, input: Record<string, unknown>) {
    const existingProfile = await this.prisma.userProfile.findUnique({ where: { userId } });

    if (existingProfile) {
      return this.prisma.userProfile.update({
        where: { userId },
        data: input,
      });
    }

    return this.prisma.userProfile.create({
      data: {
        userId,
        fullName: String(input.fullName ?? 'Ghumle User'),
        preferredTravelStyles: Array.isArray(input.preferredTravelStyles)
          ? (input.preferredTravelStyles as string[])
          : [],
        countryCode: input.countryCode as string | undefined,
        timezone: (input.timezone as string | undefined) ?? 'Asia/Kolkata',
        baseCurrency: (input.baseCurrency as string | undefined) ?? 'INR',
        isTravelPartnerVisible: Boolean(input.isTravelPartnerVisible),
        bio: input.bio as string | undefined,
      },
    });
  }

  async setRefreshTokenHash(userId: string, refreshTokenHash: string | null) {
    return this.prisma.user.update({
      where: { id: userId },
      data: {
        refreshTokenHash: refreshTokenHash ?? null,
      },
    });
  }
}
