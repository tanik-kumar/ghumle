import { Module } from '@nestjs/common';

import { AuditService } from '../../common/audit/audit.service';
import { UsersController } from './users.controller';
import { UsersRepository } from './repositories/users.repository';
import { UsersService } from './users.service';

@Module({
  controllers: [UsersController],
  providers: [UsersRepository, UsersService, AuditService],
  exports: [UsersRepository, UsersService],
})
export class UsersModule {}
