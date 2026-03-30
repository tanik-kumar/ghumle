import { Controller, ForbiddenException, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { CurrentUser } from '../../common/security/current-user.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AdminService } from './admin.service';

@ApiTags('Admin')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller({ path: 'admin', version: '1' })
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get('overview')
  overview(@CurrentUser() user: { role: string }) {
    this.ensureAdmin(user.role);
    return this.adminService.overview();
  }

  @Get('reports')
  reports(@CurrentUser() user: { role: string }) {
    this.ensureAdmin(user.role);
    return this.adminService.reports();
  }

  @Post('reports/:id/resolve')
  resolveReport(@CurrentUser() user: { sub: string; role: string }, @Param('id') id: string) {
    this.ensureAdmin(user.role);
    return this.adminService.resolveReport(user.sub, id);
  }

  @Get('faqs')
  faqs(@CurrentUser() user: { role: string }) {
    this.ensureAdmin(user.role);
    return this.adminService.faqs();
  }

  private ensureAdmin(role: string) {
    if (role !== 'ADMIN') {
      throw new ForbiddenException('Admin access required.');
    }
  }
}
