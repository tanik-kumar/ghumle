import { Injectable } from '@nestjs/common';

import { mockTravelMatches } from '@ghumle/contracts';

import { PrismaService } from '../../../common/database/prisma.service';

@Injectable()
export class MatchingRepository {
  constructor(private readonly prisma: PrismaService) {}

  async listSuggestions() {
    try {
      const profiles = await this.prisma.travelMatchProfile.findMany({
        where: {
          visibility: {
            in: ['MATCHABLE', 'PUBLIC'],
          },
          lookingForPartner: true,
        },
        include: {
          user: {
            include: {
              profile: true,
            },
          },
        },
        orderBy: {
          updatedAt: 'desc',
        },
      });

      if (profiles.length === 0) {
        return mockTravelMatches;
      }

      return profiles.map((profile) => ({
        id: profile.userId,
        displayName: profile.user.profile?.fullName ?? 'Ghumle traveler',
        destinationSlug: profile.destinationIds[0] ?? 'goa',
        destinationName: profile.destinationIds[0] ?? 'Unknown destination',
        minBudget: profile.minBudget ?? 0,
        maxBudget: profile.maxBudget ?? 0,
        travelMonth: (profile.tripMonth ?? 1) as any,
        travelYear: profile.tripYear ?? new Date().getFullYear(),
        note: profile.about ?? 'Looking for compatible travelers.',
        matchingTags: profile.preferredTags as any,
        visibility: profile.visibility as any,
      }));
    } catch {
      return mockTravelMatches;
    }
  }

  getProfile(userId: string) {
    return this.prisma.travelMatchProfile.findUnique({
      where: { userId },
    });
  }

  async upsertProfile(userId: string, input: Record<string, unknown>) {
    const existing = await this.getProfile(userId);

    if (existing) {
      return this.prisma.travelMatchProfile.update({
        where: { userId },
        data: {
          ...input,
        },
      });
    }

    return this.prisma.travelMatchProfile.create({
      data: {
        userId,
        visibility: (input.visibility as any) ?? 'PRIVATE',
        lookingForPartner: Boolean(input.lookingForPartner),
        destinationIds: (input.destinationIds as string[]) ?? [],
        minBudget: input.minBudget as number | undefined,
        maxBudget: input.maxBudget as number | undefined,
        tripMonth: input.tripMonth as number | undefined,
        tripYear: input.tripYear as number | undefined,
        preferredTags: (input.preferredTags as string[]) ?? [],
        about: input.about as string | undefined,
        safetyAgreementAccepted: Boolean(input.safetyAgreementAccepted),
      },
    });
  }

  createRequest(input: { requesterId: string; recipientId: string; destinationId?: string; message?: string }) {
    return this.prisma.matchRequest.create({
      data: input,
    });
  }

  listRequestsForUser(userId: string) {
    return this.prisma.matchRequest.findMany({
      where: {
        OR: [{ requesterId: userId }, { recipientId: userId }],
      },
      orderBy: {
        updatedAt: 'desc',
      },
    });
  }
}
