import { Module } from '@nestjs/common';

import { AuditService } from '../../common/audit/audit.service';
import { DestinationsController } from './destinations.controller';
import { DestinationsService } from './destinations.service';
import { DestinationsRepository } from './repositories/destinations.repository';

@Module({
  controllers: [DestinationsController],
  providers: [DestinationsService, DestinationsRepository, AuditService],
  exports: [DestinationsService, DestinationsRepository],
})
export class DestinationsModule {}
