import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { Public } from '../../common/security/public.decorator';
import { DiscoverySearchDto } from './dto/discovery-search.dto';
import { DiscoveryService } from './discovery.service';

@ApiTags('Discovery')
@Controller({ path: 'discovery', version: '1' })
export class DiscoveryController {
  constructor(private readonly discoveryService: DiscoveryService) {}

  @Public()
  @Post('search')
  search(@Body() dto: DiscoverySearchDto) {
    return this.discoveryService.search(dto);
  }
}
