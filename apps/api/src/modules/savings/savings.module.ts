import { Module } from '@nestjs/common';

import { AuditService } from '../../common/audit/audit.service';
import { SavingsController } from './savings.controller';
import { SavingsRepository } from './repositories/savings.repository';
import { SavingsService } from './savings.service';

@Module({
  controllers: [SavingsController],
  providers: [SavingsService, SavingsRepository, AuditService],
})
export class SavingsModule {}
