import { Module } from '@nestjs/common';

import { AuditService } from '../../common/audit/audit.service';
import { DestinationsModule } from '../destinations/destinations.module';
import { NotificationsModule } from '../notifications/notifications.module';
import { MatchingController } from './matching.controller';
import { MatchingRepository } from './repositories/matching.repository';
import { MatchingService } from './matching.service';

@Module({
  imports: [DestinationsModule, NotificationsModule],
  controllers: [MatchingController],
  providers: [MatchingService, MatchingRepository, AuditService],
})
export class MatchingModule {}
