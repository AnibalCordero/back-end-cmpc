import { IsString, IsNumber, IsBoolean, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class CreateBookDto {
  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty()
  @Type(() => Number)
  @IsNumber()
  authorId: number;

  @ApiProperty()
  @Type(() => Number)
  @IsNumber()
  editorialId: number;

  @ApiProperty()
  @Type(() => Number)
  @IsNumber()
  price: number;

  @ApiProperty()
  @Type(() => Boolean)
  @IsBoolean()
  available: boolean;

  @Type(() => Number)
  @IsNumber()
  @ApiProperty()
  genreId: number;

  @IsOptional()
  image?: string;
}