import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsString } from 'class-validator';

export class UpsertFeaturedDestinationDto {
  @ApiProperty()
  @IsString()
  slug!: string;

  @ApiProperty()
  @IsBoolean()
  featured!: boolean;
}
