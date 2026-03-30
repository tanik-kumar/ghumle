import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsBoolean, IsInt, IsOptional, IsString, Max, Min } from 'class-validator';

export class UpdateMatchProfileDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  visibility?: 'PRIVATE' | 'MATCHABLE' | 'PUBLIC';

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  lookingForPartner?: boolean;

  @ApiPropertyOptional({ type: [String] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  destinationSlugs?: string[];

  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  minBudget?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  maxBudget?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(12)
  tripMonth?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  tripYear?: number;

  @ApiPropertyOptional({ type: [String] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  preferredTags?: string[];

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  about?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  safetyAgreementAccepted?: boolean;
}
