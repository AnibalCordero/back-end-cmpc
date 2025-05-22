import {
  IsOptional,
  IsString,
  IsNumber,
  IsBoolean,
  IsNumberString,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class UpdateBookDto {
  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  title?: string;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @ApiProperty()
  authorId?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @ApiProperty()
  editorialId?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @ApiProperty()
  genreId?: number;


  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @ApiPropertyOptional()
  price?: number;

  @IsOptional()
  @Type(() => Boolean)
  @IsBoolean()
  @ApiPropertyOptional()
  available?: boolean;

  @IsOptional()
  image?: string;
}
