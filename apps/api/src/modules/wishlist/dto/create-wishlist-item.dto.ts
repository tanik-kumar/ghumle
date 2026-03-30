import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString, Max, Min } from 'class-validator';

export class CreateWishlistItemDto {
  @ApiProperty()
  @IsString()
  destinationSlug!: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  targetBudget?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(12)
  targetMonth?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  targetYear?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  note?: string;
}
