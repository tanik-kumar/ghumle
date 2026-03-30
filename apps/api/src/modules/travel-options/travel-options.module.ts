import { Module } from '@nestjs/common';

import { DestinationsModule } from '../destinations/destinations.module';
import { MockTransportProvider } from './providers/mock-transport.provider';
import { TravelOptionsController } from './travel-options.controller';
import { TravelOptionsService } from './travel-options.service';

@Module({
  imports: [DestinationsModule],
  controllers: [TravelOptionsController],
  providers: [TravelOptionsService, MockTransportProvider],
})
export class TravelOptionsModule {}
