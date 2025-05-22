import { Controller, Post, Body, Get, Req, UseGuards } from '@nestjs/common';
import { CreateUserUseCase } from '../../application/user-create.use-case';
import { CreateUserDto } from '../../domain/dto/user.dto';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse, ApiBody, ApiConflictResponse } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { GetOneUserUseCase } from '../../application/user-get-one.use-case';

@ApiTags('Users')
@ApiBearerAuth()
@Controller('users')
@Controller('users')
export class UserController {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly getOneUserUseCase: GetOneUserUseCase
  ) { }

  @Post()
  @ApiOperation({ summary: 'Registrar nuevo usuario' })
  @ApiBody({ type: CreateUserDto })
  @ApiResponse({ status: 201, description: 'Usuario creado exitosamente' })
  @ApiConflictResponse({ description: 'El correo ya está registrado' })
  async register(@Body() dto: CreateUserDto) {
    return this.createUserUseCase.execute(dto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('me')
  @ApiOperation({ summary: 'Obtener el usuario autenticado' })
  @ApiResponse({ status: 200, description: 'Usuario autenticado' })
  getCurrentUser(@Req() req) {
    return this.getOneUserUseCase.execute(req.user);
  }
}
