import { Injectable } from '@nestjs/common';

import { mockDestinations, type DestinationRecord, type TripScope } from '@ghumle/contracts';

import { PrismaService } from '../../../common/database/prisma.service';

function toDestinationRecord(item: any): DestinationRecord {
  return {
    id: item.id,
    slug: item.slug,
    name: item.name,
    country: item.country,
    countryCode: item.countryCode,
    region: item.region,
    scope: item.scope,
    summary: item.summary,
    currency: item.currency,
    heroImage: item.heroImage,
    averageDailyBudget: item.averageDailyBudget,
    popularityScore: item.popularityScore,
    convenienceScore: item.convenienceScore,
    safetyScore: item.safetyScore,
    familyScore: item.familyScore,
    coupleScore: item.coupleScore,
    bestMonths: item.bestMonths,
    bestTimeToVisit: item.bestTimeToVisit,
    recommendedDuration: {
      minDays: item.recommendedDurationMin,
      maxDays: item.recommendedDurationMax,
    },
    visaNote: item.visaNote,
    safetyNote: item.safetyNote,
    tags: item.tags,
    topAttractions: Array.isArray(item.topAttractions) ? item.topAttractions : [],
    hotelAreas: Array.isArray(item.hotelAreas) ? item.hotelAreas : [],
    foodSuggestions: Array.isArray(item.foodSuggestions) ? item.foodSuggestions : [],
    activitySuggestions: Array.isArray(item.activitySuggestions) ? item.activitySuggestions : [],
    travelOptions: Array.isArray(item.priceEstimates)
      ? item.priceEstimates.map((price: any) => ({
          mode: price.mode,
          minPrice: price.minPrice,
          maxPrice: price.maxPrice,
          note: price.note,
        }))
      : [],
    costTemplate: {
      transportPerTraveler:
        item.priceEstimates?.find((price: any) => price.mode === 'FLIGHT')?.minPrice ?? item.averageDailyBudget * 2,
      stayPerNight: Math.round(item.averageDailyBudget * 0.75),
      foodPerTravelerPerDay: Math.round(item.averageDailyBudget * 0.2),
      localTransportPerDay: Math.round(item.averageDailyBudget * 0.14),
      activitiesPerTravelerPerDay: Math.round(item.averageDailyBudget * 0.24),
      contingencyRate: 0.12,
    },
  };
}

@Injectable()
export class DestinationsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async list(filters?: { scope?: TripScope; tag?: string }): Promise<DestinationRecord[]> {
    try {
      const destinations = await this.prisma.destination.findMany({
        where: {
          scope: filters?.scope,
          ...(filters?.tag ? { tags: { has: filters.tag } } : {}),
        },
        include: {
          priceEstimates: true,
        },
        orderBy: {
          popularityScore: 'desc',
        },
      });

      if (destinations.length === 0) {
        return mockDestinations;
      }

      return destinations.map(toDestinationRecord);
    } catch {
      return mockDestinations.filter((destination) => {
        if (filters?.scope && destination.scope !== filters.scope) {
          return false;
        }

        if (filters?.tag && !destination.tags.includes(filters.tag as any)) {
          return false;
        }

        return true;
      });
    }
  }

  async findBySlug(slug: string): Promise<DestinationRecord | undefined> {
    try {
      const destination = await this.prisma.destination.findUnique({
        where: { slug },
        include: { priceEstimates: true },
      });

      return destination ? toDestinationRecord(destination) : mockDestinations.find((item) => item.slug === slug);
    } catch {
      return mockDestinations.find((item) => item.slug === slug);
    }
  }

  async create(input: Record<string, unknown>) {
    return this.prisma.destination.create({
      data: {
        slug: input.slug as string,
        name: input.name as string,
        country: input.country as string,
        countryCode: input.countryCode as string,
        region: input.region as string,
        summary: input.summary as string,
        heroImage: input.heroImage as string,
        currency: input.currency as string,
        averageDailyBudget: Number(input.averageDailyBudget),
        popularityScore: Number(input.popularityScore),
        convenienceScore: Number(input.convenienceScore),
        safetyScore: Number(input.safetyScore),
        familyScore: Number(input.familyScore),
        coupleScore: Number(input.coupleScore),
        bestMonths: input.bestMonths as number[],
        bestTimeToVisit: input.bestTimeToVisit as string,
        recommendedDurationMin: Number(input.recommendedDurationMin),
        recommendedDurationMax: Number(input.recommendedDurationMax),
        visaNote: input.visaNote as string,
        safetyNote: input.safetyNote as string,
        tags: input.tags as string[],
        topAttractions: input.topAttractions as string[],
        hotelAreas: input.hotelAreas as string[],
        foodSuggestions: input.foodSuggestions as string[],
        activitySuggestions: input.activitySuggestions as string[],
        scope: input.scope as any,
      },
    });
  }

  async update(slug: string, input: Record<string, unknown>) {
    return this.prisma.destination.update({
      where: { slug },
      data: {
        ...input,
      },
    });
  }

  async remove(slug: string) {
    return this.prisma.destination.delete({
      where: { slug },
    });
  }
}
