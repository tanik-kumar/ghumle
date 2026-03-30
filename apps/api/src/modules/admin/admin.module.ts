import { Module } from '@nestjs/common';

import { AuditService } from '../../common/audit/audit.service';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { AdminRepository } from './repositories/admin.repository';

@Module({
  controllers: [AdminController],
  providers: [AdminService, AdminRepository, AuditService],
})
export class AdminModule {}
