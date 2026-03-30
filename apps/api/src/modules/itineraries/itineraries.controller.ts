import { Body, Controller, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { CurrentUser } from '../../common/security/current-user.decorator';
import { Public } from '../../common/security/public.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { GenerateItineraryDto, SaveItineraryDto } from './dto/generate-itinerary.dto';
import { UpdateItineraryDto } from './dto/update-itinerary.dto';
import { ItinerariesService } from './itineraries.service';

@ApiTags('Itineraries')
@Controller({ path: 'itineraries', version: '1' })
export class ItinerariesController {
  constructor(private readonly itinerariesService: ItinerariesService) {}

  @Public()
  @Post('generate')
  generate(@Body() dto: GenerateItineraryDto) {
    return this.itinerariesService.generatePreview(dto);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post('save')
  save(@CurrentUser() user: { sub: string }, @Body() dto: SaveItineraryDto) {
    return this.itinerariesService.save(user.sub, dto);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('my')
  listMine(@CurrentUser() user: { sub: string }) {
    return this.itinerariesService.listMine(user.sub);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  detail(@CurrentUser() user: { sub: string }, @Param('id') id: string) {
    return this.itinerariesService.detail(user.sub, id);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@CurrentUser() user: { sub: string }, @Param('id') id: string, @Body() dto: UpdateItineraryDto) {
    return this.itinerariesService.update(user.sub, id, dto);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post(':id/duplicate')
  duplicate(@CurrentUser() user: { sub: string }, @Param('id') id: string) {
    return this.itinerariesService.duplicate(user.sub, id);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Patch(':id/days/:dayNumber/regenerate')
  regenerateDay(
    @CurrentUser() user: { sub: string },
    @Param('id') id: string,
    @Param('dayNumber') dayNumber: string,
  ) {
    return this.itinerariesService.regenerateDay(user.sub, id, Number(dayNumber));
  }
}
