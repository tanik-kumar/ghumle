import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsBoolean, IsEnum, IsInt, IsOptional, IsString, Max, Min } from 'class-validator';

import { destinationTagValues, tripScopeValues } from '@ghumle/contracts';

export class DiscoverySearchDto {
  @ApiProperty()
  @IsInt()
  @Min(5000)
  totalBudget!: number;

  @ApiProperty({ enum: tripScopeValues })
  @IsEnum(tripScopeValues)
  scope!: (typeof tripScopeValues)[number];

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  countryCode?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsBoolean()
  worldwide?: boolean;

  @ApiProperty()
  @IsInt()
  @Min(1)
  @Max(12)
  travelers!: number;

  @ApiProperty({ type: [String], enum: destinationTagValues })
  @IsArray()
  @IsEnum(destinationTagValues, { each: true })
  placeTypes!: (typeof destinationTagValues)[number][];

  @ApiProperty()
  @IsInt()
  @Min(1)
  @Max(21)
  tripDurationDays!: number;

  @ApiProperty()
  @IsInt()
  @Min(1)
  @Max(12)
  preferredMonth!: number;
}
