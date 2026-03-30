import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsDateString, IsInt, IsOptional, IsString, Min } from 'class-validator';

export class CreateSavingsGoalDto {
  @ApiProperty()
  @IsString()
  title!: string;

  @ApiProperty()
  @IsInt()
  @Min(1)
  goalAmount!: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  @Min(0)
  savedAmount?: number;

  @ApiProperty()
  @IsDateString()
  targetDate!: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  tripPlanId?: string;
}
