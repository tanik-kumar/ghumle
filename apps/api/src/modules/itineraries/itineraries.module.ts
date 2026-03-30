import { Module } from '@nestjs/common';

import { AuditService } from '../../common/audit/audit.service';
import { DestinationsModule } from '../destinations/destinations.module';
import { ItinerariesController } from './itineraries.controller';
import { ItinerariesService } from './itineraries.service';
import { ItinerariesRepository } from './repositories/itineraries.repository';

@Module({
  imports: [DestinationsModule],
  controllers: [ItinerariesController],
  providers: [ItinerariesService, ItinerariesRepository, AuditService],
})
export class ItinerariesModule {}
