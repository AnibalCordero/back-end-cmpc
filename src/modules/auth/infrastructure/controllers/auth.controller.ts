import { Controller, Post, Body } from '@nestjs/common';
import { LoginUseCase } from '../../application/login.use-case';
import { LoginDto } from '../../domain/dto/login.dto';
import { ApiTags, ApiOperation, ApiBody, ApiResponse } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly loginUseCase: LoginUseCase) { }

  @ApiOperation({ summary: 'Inicio de sesión' })
  @ApiBody({ type: LoginDto })
  @ApiResponse({ status: 201, description: 'Token generado exitosamente' })
  @ApiResponse({ status: 401, description: 'Credenciales inválidas' })
  @Post('login')
  async login(@Body() dto: LoginDto) {
    return this.loginUseCase.execute(dto.email, dto.password);
  }
}