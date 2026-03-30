import { Injectable } from '@nestjs/common';

import type { DestinationRecord, DiscoverySuggestion } from '@ghumle/contracts';

import { DestinationsRepository } from '../destinations/repositories/destinations.repository';
import { DiscoverySearchDto } from './dto/discovery-search.dto';

@Injectable()
export class DiscoveryService {
  constructor(private readonly destinationsRepository: DestinationsRepository) {}

  async search(dto: DiscoverySearchDto): Promise<DiscoverySuggestion[]> {
    const destinations = await this.destinationsRepository.list({ scope: dto.scope });

    return destinations
      .filter((destination) =>
        dto.placeTypes.length === 0
          ? true
          : dto.placeTypes.some((placeType) => destination.tags.includes(placeType)),
      )
      .map((destination) => this.rankDestination(destination, dto))
      .sort((left, right) => right.totalScore - left.totalScore)
      .slice(0, 6);
  }

  private rankDestination(destination: DestinationRecord, dto: DiscoverySearchDto): DiscoverySuggestion {
    const nights = Math.max(1, dto.tripDurationDays - 1);
    const transport = destination.costTemplate.transportPerTraveler * dto.travelers;
    const stay = destination.costTemplate.stayPerNight * nights;
    const food = destination.costTemplate.foodPerTravelerPerDay * dto.tripDurationDays * dto.travelers;
    const localTransport = destination.costTemplate.localTransportPerDay * dto.tripDurationDays;
    const activities = destination.costTemplate.activitiesPerTravelerPerDay * dto.tripDurationDays * dto.travelers;
    const contingency = Math.round(
      (transport + stay + food + localTransport + activities) * destination.costTemplate.contingencyRate,
    );
    const estimatedTotalCost = transport + stay + food + localTransport + activities + contingency;

    const budgetGap = estimatedTotalCost - dto.totalBudget;
    const budgetFit =
      budgetGap <= 0
        ? Math.max(74, 100 - Math.round((Math.abs(budgetGap) / dto.totalBudget) * 24))
        : Math.max(24, 78 - Math.round((budgetGap / dto.totalBudget) * 100));
    const weatherSuitability = destination.bestMonths.includes(dto.preferredMonth as any) ? 96 : 68;
    const valueForMoney = Math.max(
      48,
      Math.round((destination.popularityScore + 10000 / destination.averageDailyBudget) * 0.65),
    );

    const totalScore = Math.round(
      budgetFit * 0.34 +
        destination.convenienceScore * 0.18 +
        destination.popularityScore * 0.16 +
        weatherSuitability * 0.16 +
        valueForMoney * 0.16,
    );

    return {
      destination,
      estimatedTotalCost,
      costBreakup: {
        transport,
        stay,
        food,
        localTransport,
        activities,
        contingency,
      },
      scoreBreakdown: {
        budgetFit,
        convenience: destination.convenienceScore,
        popularity: destination.popularityScore,
        weatherSuitability,
        valueForMoney,
      },
      totalScore,
      whyItMatches: [
        `${destination.name} matches ${dto.placeTypes.map((item) => item.toLowerCase()).join(', ')} intent.`,
        `Estimated total cost is around INR ${estimatedTotalCost.toLocaleString()} for ${dto.travelers} traveler(s).`,
        `${destination.bestTimeToVisit} is the strongest travel window for this destination.`,
      ],
    };
  }
}
