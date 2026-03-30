import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsEnum, IsInt, IsOptional, IsString, IsUrl, Max, Min } from 'class-validator';

import { tripScopeValues } from '@ghumle/contracts';

export class CreateDestinationDto {
  @ApiProperty()
  @IsString()
  slug!: string;

  @ApiProperty()
  @IsString()
  name!: string;

  @ApiProperty()
  @IsString()
  country!: string;

  @ApiProperty()
  @IsString()
  countryCode!: string;

  @ApiProperty()
  @IsString()
  region!: string;

  @ApiProperty()
  @IsString()
  summary!: string;

  @ApiProperty()
  @IsUrl()
  heroImage!: string;

  @ApiProperty()
  @IsString()
  currency!: string;

  @ApiProperty()
  @IsInt()
  averageDailyBudget!: number;

  @ApiProperty()
  @IsInt()
  @Min(1)
  @Max(100)
  popularityScore!: number;

  @ApiProperty()
  @IsInt()
  @Min(1)
  @Max(100)
  convenienceScore!: number;

  @ApiProperty()
  @IsInt()
  @Min(1)
  @Max(100)
  safetyScore!: number;

  @ApiProperty()
  @IsInt()
  @Min(1)
  @Max(100)
  familyScore!: number;

  @ApiProperty()
  @IsInt()
  @Min(1)
  @Max(100)
  coupleScore!: number;

  @ApiProperty({ type: [Number] })
  @IsArray()
  @IsInt({ each: true })
  bestMonths!: number[];

  @ApiProperty()
  @IsString()
  bestTimeToVisit!: string;

  @ApiProperty()
  @IsInt()
  recommendedDurationMin!: number;

  @ApiProperty()
  @IsInt()
  recommendedDurationMax!: number;

  @ApiProperty()
  @IsString()
  visaNote!: string;

  @ApiProperty()
  @IsString()
  safetyNote!: string;

  @ApiProperty({ type: [String] })
  @IsArray()
  @IsString({ each: true })
  tags!: string[];

  @ApiProperty({ type: [String] })
  @IsArray()
  @IsString({ each: true })
  topAttractions!: string[];

  @ApiProperty({ type: [String] })
  @IsArray()
  @IsString({ each: true })
  hotelAreas!: string[];

  @ApiProperty({ type: [String] })
  @IsArray()
  @IsString({ each: true })
  foodSuggestions!: string[];

  @ApiProperty({ type: [String] })
  @IsArray()
  @IsString({ each: true })
  activitySuggestions!: string[];

  @ApiProperty({ enum: tripScopeValues })
  @IsEnum(tripScopeValues)
  scope!: (typeof tripScopeValues)[number];
}
