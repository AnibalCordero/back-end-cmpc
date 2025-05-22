import { IsOptional, IsString, IsNumberString, IsIn, IsNumber } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class GetBookQueryDto {
  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  title?: string;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  @ApiPropertyOptional()
  authorId?: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  @ApiPropertyOptional()
  genreId?: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  @ApiPropertyOptional()
  editorialId?: number;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  available?: 'true' | 'false';

  @IsOptional()
  @IsNumberString()
  @ApiPropertyOptional()
  page?: string;

  @IsOptional()
  @IsNumberString()
  @ApiPropertyOptional()
  limit?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({ example: 'title' })
  orderBy?: string;

  @IsOptional()
  @IsIn(['ASC', 'DESC', 'asc', 'desc'])
  @ApiPropertyOptional({ example: 'ASC' })
  order?: 'ASC' | 'DESC' | 'asc' | 'desc';
}
