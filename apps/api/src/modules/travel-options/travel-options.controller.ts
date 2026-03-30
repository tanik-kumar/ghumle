import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { Public } from '../../common/security/public.decorator';
import { TravelOptionsService } from './travel-options.service';

@ApiTags('Travel Options')
@Controller({ path: 'travel-options', version: '1' })
export class TravelOptionsController {
  constructor(private readonly travelOptionsService: TravelOptionsService) {}

  @Public()
  @Get(':destinationSlug')
  byDestination(@Param('destinationSlug') destinationSlug: string) {
    return this.travelOptionsService.byDestination(destinationSlug);
  }
}
