import { Injectable, NotFoundException } from '@nestjs/common';

import { AuditService } from '../../common/audit/audit.service';
import { CreateDestinationDto } from './dto/create-destination.dto';
import { UpdateDestinationDto } from './dto/update-destination.dto';
import { DestinationsRepository } from './repositories/destinations.repository';

@Injectable()
export class DestinationsService {
  constructor(
    private readonly destinationsRepository: DestinationsRepository,
    private readonly auditService: AuditService,
  ) {}

  list(filters?: { scope?: 'DOMESTIC' | 'INTERNATIONAL'; tag?: string }) {
    return this.destinationsRepository.list(filters);
  }

  async detail(slug: string) {
    const destination = await this.destinationsRepository.findBySlug(slug);

    if (!destination) {
      throw new NotFoundException('Destination not found.');
    }

    return destination;
  }

  async create(dto: CreateDestinationDto, actorId: string) {
    const destination = await this.destinationsRepository.create(dto as unknown as Record<string, unknown>);
    await this.auditService.log(actorId, 'destination.created', 'Destination', destination.id, dto);
    return destination;
  }

  async update(slug: string, dto: UpdateDestinationDto, actorId: string) {
    const destination = await this.destinationsRepository.update(
      slug,
      dto as unknown as Record<string, unknown>,
    );
    await this.auditService.log(actorId, 'destination.updated', 'Destination', destination.id, dto);
    return destination;
  }

  async remove(slug: string, actorId: string) {
    const destination = await this.destinationsRepository.remove(slug);
    await this.auditService.log(actorId, 'destination.removed', 'Destination', destination.id);
    return destination;
  }
}
