import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsInt, IsOptional, IsString, Max, Min } from 'class-validator';

import { itineraryPaceValues } from '@ghumle/contracts';

export class GenerateItineraryDto {
  @ApiProperty()
  @IsString()
  destinationSlug!: string;

  @ApiProperty()
  @IsInt()
  @Min(1)
  @Max(14)
  durationDays!: number;

  @ApiProperty()
  @IsInt()
  @Min(1)
  @Max(12)
  travelers!: number;

  @ApiProperty({ enum: itineraryPaceValues })
  @IsEnum(itineraryPaceValues)
  pace!: (typeof itineraryPaceValues)[number];
}

export class SaveItineraryDto extends GenerateItineraryDto {
  @ApiProperty()
  @IsString()
  title!: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  totalBudget?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(12)
  travelMonth?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  travelYear?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  notes?: string;
}
