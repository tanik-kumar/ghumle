import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString } from 'class-validator';

import { itineraryPaceValues } from '@ghumle/contracts';

export class UpdateItineraryDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  title?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  notes?: string;

  @ApiPropertyOptional({ enum: itineraryPaceValues })
  @IsOptional()
  @IsEnum(itineraryPaceValues)
  pace?: (typeof itineraryPaceValues)[number];
}
