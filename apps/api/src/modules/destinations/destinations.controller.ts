import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { CurrentUser } from '../../common/security/current-user.decorator';
import { Public } from '../../common/security/public.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateDestinationDto } from './dto/create-destination.dto';
import { UpdateDestinationDto } from './dto/update-destination.dto';
import { DestinationsService } from './destinations.service';

@ApiTags('Destinations')
@Controller({ path: 'destinations', version: '1' })
export class DestinationsController {
  constructor(private readonly destinationsService: DestinationsService) {}

  @Public()
  @Get()
  list(@Query('scope') scope?: 'DOMESTIC' | 'INTERNATIONAL', @Query('tag') tag?: string) {
    return this.destinationsService.list({ scope, tag });
  }

  @Public()
  @Get(':slug')
  detail(@Param('slug') slug: string) {
    return this.destinationsService.detail(slug);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@CurrentUser() user: { sub: string; role: string }, @Body() dto: CreateDestinationDto) {
    this.ensureAdmin(user.role);
    return this.destinationsService.create(dto, user.sub);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Patch(':slug')
  update(
    @CurrentUser() user: { sub: string; role: string },
    @Param('slug') slug: string,
    @Body() dto: UpdateDestinationDto,
  ) {
    this.ensureAdmin(user.role);
    return this.destinationsService.update(slug, dto, user.sub);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Delete(':slug')
  remove(@CurrentUser() user: { sub: string; role: string }, @Param('slug') slug: string) {
    this.ensureAdmin(user.role);
    return this.destinationsService.remove(slug, user.sub);
  }

  private ensureAdmin(role: string) {
    if (role !== 'ADMIN') {
      throw new ForbiddenException('Admin access required.');
    }
  }
}
