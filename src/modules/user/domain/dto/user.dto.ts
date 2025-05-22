import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'nuevo@cmpc.cl' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'Nombre del usuario' })
  @IsString()
  @MinLength(3)
  name: string;

  @ApiProperty({ example: 'superclave123' })
  @IsString()
  @MinLength(6)
  password: string;
}