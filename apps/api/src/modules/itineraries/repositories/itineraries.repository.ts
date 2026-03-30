import { Injectable } from '@nestjs/common';

import { PrismaService } from '../../../common/database/prisma.service';

@Injectable()
export class ItinerariesRepository {
  constructor(private readonly prisma: PrismaService) {}

  createPlan(input: {
    userId: string;
    destinationId: string;
    title: string;
    travelers: number;
    travelMonth?: number;
    travelYear?: number;
    totalBudget?: number;
    totalEstimatedCost: number;
    coverImage?: string;
    notes?: string;
    pace: 'RELAXED' | 'BALANCED' | 'PACKED';
    hotelArea?: string;
    summary?: string;
    days: Array<{
      dayNumber: number;
      title: string;
      summary: string;
      localTravelMinutes: number;
      hotelArea: string;
      visits: string[];
      meals: string[];
      activities: string[];
    }>;
  }) {
    return this.prisma.tripPlan.create({
      data: {
        userId: input.userId,
        destinationId: input.destinationId,
        title: input.title,
        travelers: input.travelers,
        travelMonth: input.travelMonth,
        travelYear: input.travelYear,
        totalBudget: input.totalBudget,
        totalEstimatedCost: input.totalEstimatedCost,
        coverImage: input.coverImage,
        notes: input.notes,
        itinerary: {
          create: {
            pace: input.pace,
            hotelArea: input.hotelArea,
            summary: input.summary,
            days: {
              create: input.days.map((day) => ({
                dayNumber: day.dayNumber,
                title: day.title,
                summary: day.summary,
                localTravelMinutes: day.localTravelMinutes,
                hotelArea: day.hotelArea,
                places: day.visits,
                meals: day.meals,
                activities: day.activities,
              })),
            },
          },
        },
      },
      include: {
        destination: true,
        itinerary: {
          include: {
            days: true,
          },
        },
      },
    });
  }

  listByUser(userId: string) {
    return this.prisma.tripPlan.findMany({
      where: { userId },
      include: {
        destination: true,
        itinerary: {
          include: {
            days: true,
          },
        },
      },
      orderBy: {
        updatedAt: 'desc',
      },
    });
  }

  findById(id: string, userId: string) {
    return this.prisma.tripPlan.findFirst({
      where: { id, userId },
      include: {
        destination: true,
        itinerary: {
          include: {
            days: true,
          },
        },
      },
    });
  }

  async update(id: string, userId: string, input: { title?: string; notes?: string; pace?: 'RELAXED' | 'BALANCED' | 'PACKED' }) {
    const existing = await this.findById(id, userId);

    if (!existing) {
      return null;
    }

    if (input.pace) {
      await this.prisma.itinerary.updateMany({
        where: { tripPlanId: id, tripPlan: { userId } },
        data: { pace: input.pace },
      });
    }

    return this.prisma.tripPlan.update({
      where: { id },
      data: {
        title: input.title,
        notes: input.notes,
      },
      include: {
        destination: true,
        itinerary: {
          include: {
            days: true,
          },
        },
      },
    });
  }

  async duplicate(id: string, userId: string) {
    const source = await this.findById(id, userId);

    if (!source?.itinerary) {
      return null;
    }

    if (!source.destinationId) {
      return null;
    }

    return this.createPlan({
      userId,
      destinationId: source.destinationId,
      title: `${source.title} Copy`,
      travelers: source.travelers ?? 1,
      travelMonth: source.travelMonth ?? undefined,
      travelYear: source.travelYear ?? undefined,
      totalBudget: source.totalBudget ?? undefined,
      totalEstimatedCost: source.totalEstimatedCost ?? 0,
      coverImage: source.coverImage ?? undefined,
      notes: source.notes ?? undefined,
      pace: source.itinerary.pace,
      hotelArea: source.itinerary.hotelArea ?? undefined,
      summary: source.itinerary.summary ?? undefined,
      days: source.itinerary.days.map((day) => ({
        dayNumber: day.dayNumber,
        title: day.title,
        summary: day.summary ?? '',
        localTravelMinutes: day.localTravelMinutes,
        hotelArea: day.hotelArea ?? '',
        visits: Array.isArray(day.places) ? (day.places as string[]) : [],
        meals: Array.isArray(day.meals) ? (day.meals as string[]) : [],
        activities: Array.isArray(day.activities) ? (day.activities as string[]) : [],
      })),
    });
  }

  async updateDay(id: string, userId: string, dayNumber: number, day: { title: string; summary: string; localTravelMinutes: number; hotelArea: string; visits: string[]; meals: string[]; activities: string[] }) {
    const plan = await this.findById(id, userId);

    if (!plan?.itinerary) {
      return null;
    }

    await this.prisma.itineraryDay.update({
      where: {
        itineraryId_dayNumber: {
          itineraryId: plan.itinerary.id,
          dayNumber,
        },
      },
      data: {
        title: day.title,
        summary: day.summary,
        localTravelMinutes: day.localTravelMinutes,
        hotelArea: day.hotelArea,
        places: day.visits,
        meals: day.meals,
        activities: day.activities,
      },
    });

    return this.findById(id, userId);
  }
}
