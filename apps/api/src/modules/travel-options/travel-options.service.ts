import { Injectable, NotFoundException } from '@nestjs/common';

import { DestinationsRepository } from '../destinations/repositories/destinations.repository';
import { MockTransportProvider } from './providers/mock-transport.provider';

@Injectable()
export class TravelOptionsService {
  constructor(
    private readonly destinationsRepository: DestinationsRepository,
    private readonly mockTransportProvider: MockTransportProvider,
  ) {}

  async byDestination(slug: string) {
    const destination = await this.destinationsRepository.findBySlug(slug);

    if (!destination) {
      throw new NotFoundException('Destination not found.');
    }

    return this.mockTransportProvider.getOptions(destination);
  }
}
