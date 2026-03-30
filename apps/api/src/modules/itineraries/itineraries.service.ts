import { Injectable, NotFoundException } from '@nestjs/common';

import { generateItinerary, type DestinationRecord } from '@ghumle/contracts';

import { AuditService } from '../../common/audit/audit.service';
import { DestinationsRepository } from '../destinations/repositories/destinations.repository';
import { GenerateItineraryDto, SaveItineraryDto } from './dto/generate-itinerary.dto';
import { UpdateItineraryDto } from './dto/update-itinerary.dto';
import { ItinerariesRepository } from './repositories/itineraries.repository';

@Injectable()
export class ItinerariesService {
  constructor(
    private readonly destinationsRepository: DestinationsRepository,
    private readonly itinerariesRepository: ItinerariesRepository,
    private readonly auditService: AuditService,
  ) {}

  async generatePreview(dto: GenerateItineraryDto) {
    const destination = await this.getDestination(dto.destinationSlug);
    const days = generateItinerary(dto);

    return {
      destination,
      pace: dto.pace,
      durationDays: dto.durationDays,
      travelers: dto.travelers,
      days,
    };
  }

  async save(userId: string, dto: SaveItineraryDto) {
    const destination = await this.getDestination(dto.destinationSlug);
    const days = generateItinerary(dto);
    const totalEstimatedCost = this.estimateItineraryCost(destination, dto.travelers, dto.durationDays);

    const plan = await this.itinerariesRepository.createPlan({
      userId,
      destinationId: destination.id,
      title: dto.title,
      travelers: dto.travelers,
      travelMonth: dto.travelMonth,
      travelYear: dto.travelYear,
      totalBudget: dto.totalBudget,
      totalEstimatedCost,
      coverImage: destination.heroImage,
      notes: dto.notes,
      pace: dto.pace,
      hotelArea: days[0]?.hotelArea,
      summary: `${dto.pace.toLowerCase()} ${dto.durationDays}-day itinerary for ${destination.name}.`,
      days: days.map((day) => ({
        dayNumber: day.day,
        title: day.title,
        summary: day.summary,
        localTravelMinutes: day.localTravelMinutes,
        hotelArea: day.hotelArea,
        visits: day.visits,
        meals: day.meals,
        activities: day.activities,
      })),
    });

    await this.auditService.log(userId, 'itinerary.saved', 'TripPlan', plan.id, dto);
    return plan;
  }

  listMine(userId: string) {
    return this.itinerariesRepository.listByUser(userId);
  }

  async detail(userId: string, id: string) {
    const plan = await this.itinerariesRepository.findById(id, userId);

    if (!plan) {
      throw new NotFoundException('Trip plan not found.');
    }

    return plan;
  }

  async update(userId: string, id: string, dto: UpdateItineraryDto) {
    const plan = await this.itinerariesRepository.update(id, userId, dto);
    if (!plan) {
      throw new NotFoundException('Trip plan not found.');
    }
    await this.auditService.log(userId, 'itinerary.updated', 'TripPlan', id, dto);
    return plan;
  }

  async duplicate(userId: string, id: string) {
    const plan = await this.itinerariesRepository.duplicate(id, userId);

    if (!plan) {
      throw new NotFoundException('Trip plan not found.');
    }

    await this.auditService.log(userId, 'itinerary.duplicated', 'TripPlan', plan.id, { sourceId: id });
    return plan;
  }

  async regenerateDay(userId: string, id: string, dayNumber: number) {
    const plan = await this.detail(userId, id);

    if (!plan.destination || !plan.itinerary) {
      throw new NotFoundException('Trip plan is missing destination or itinerary data.');
    }

    const destination = await this.getDestination(plan.destination.slug);
    const regenerated = generateItinerary({
      destinationSlug: destination.slug,
      durationDays: plan.itinerary.days.length,
      travelers: plan.travelers ?? 1,
      pace: plan.itinerary.pace,
    });
    const nextDay = regenerated.find((item) => item.day === dayNumber);

    if (!nextDay) {
      throw new NotFoundException('Requested itinerary day was not found.');
    }

    const updated = await this.itinerariesRepository.updateDay(id, userId, dayNumber, {
      title: nextDay.title,
      summary: nextDay.summary,
      localTravelMinutes: nextDay.localTravelMinutes,
      hotelArea: nextDay.hotelArea,
      visits: nextDay.visits,
      meals: nextDay.meals,
      activities: nextDay.activities,
    });

    await this.auditService.log(userId, 'itinerary.day.regenerated', 'ItineraryDay', undefined, {
      tripPlanId: id,
      dayNumber,
    });

    return updated;
  }

  private async getDestination(slug: string): Promise<DestinationRecord> {
    const destination = await this.destinationsRepository.findBySlug(slug);

    if (!destination) {
      throw new NotFoundException('Destination not found.');
    }

    return destination;
  }

  private estimateItineraryCost(destination: DestinationRecord, travelers: number, durationDays: number) {
    const nights = Math.max(1, durationDays - 1);
    const transport = destination.costTemplate.transportPerTraveler * travelers;
    const stay = destination.costTemplate.stayPerNight * nights;
    const food = destination.costTemplate.foodPerTravelerPerDay * durationDays * travelers;
    const local = destination.costTemplate.localTransportPerDay * durationDays;
    const activities = destination.costTemplate.activitiesPerTravelerPerDay * durationDays * travelers;
    return transport + stay + food + local + activities;
  }
}
