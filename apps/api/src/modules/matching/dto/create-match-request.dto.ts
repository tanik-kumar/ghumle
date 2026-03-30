import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class CreateMatchRequestDto {
  @ApiProperty()
  @IsString()
  recipientId!: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  destinationSlug?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  message?: string;
}
