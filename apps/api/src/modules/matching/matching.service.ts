import { Injectable } from '@nestjs/common';

import { AuditService } from '../../common/audit/audit.service';
import { DestinationsRepository } from '../destinations/repositories/destinations.repository';
import { NotificationsService } from '../notifications/notifications.service';
import { CreateMatchRequestDto } from './dto/create-match-request.dto';
import { UpdateMatchProfileDto } from './dto/update-match-profile.dto';
import { MatchingRepository } from './repositories/matching.repository';

@Injectable()
export class MatchingService {
  constructor(
    private readonly matchingRepository: MatchingRepository,
    private readonly destinationsRepository: DestinationsRepository,
    private readonly notificationsService: NotificationsService,
    private readonly auditService: AuditService,
  ) {}

  suggestions() {
    return this.matchingRepository.listSuggestions();
  }

  getProfile(userId: string) {
    return this.matchingRepository.getProfile(userId);
  }

  async upsertProfile(userId: string, dto: UpdateMatchProfileDto) {
    const profile = await this.matchingRepository.upsertProfile(userId, {
      visibility: dto.visibility,
      lookingForPartner: dto.lookingForPartner,
      destinationIds: dto.destinationSlugs,
      minBudget: dto.minBudget,
      maxBudget: dto.maxBudget,
      tripMonth: dto.tripMonth,
      tripYear: dto.tripYear,
      preferredTags: dto.preferredTags,
      about: dto.about,
      safetyAgreementAccepted: dto.safetyAgreementAccepted,
    });

    await this.auditService.log(userId, 'matching.profile.updated', 'TravelMatchProfile', profile.id, dto);
    return profile;
  }

  async createRequest(userId: string, dto: CreateMatchRequestDto) {
    const destination = dto.destinationSlug
      ? await this.destinationsRepository.findBySlug(dto.destinationSlug)
      : undefined;
    const request = await this.matchingRepository.createRequest({
      requesterId: userId,
      recipientId: dto.recipientId,
      destinationId: destination?.id,
      message: dto.message,
    });

    this.notificationsService.enqueueMatchNotification(dto.recipientId, userId);
    await this.auditService.log(userId, 'matching.request.created', 'MatchRequest', request.id, dto);
    return request;
  }

  listRequests(userId: string) {
    return this.matchingRepository.listRequestsForUser(userId);
  }
}
