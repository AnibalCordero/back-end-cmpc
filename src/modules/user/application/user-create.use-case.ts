import { Injectable, ConflictException } from '@nestjs/common';
import { CreateUserDto } from '../domain/dto/user.dto';
import { UserService } from '../infrastructure/services/user.service';
@Injectable()
export class CreateUserUseCase {
  constructor(private readonly userService: UserService) { }

  async execute(dto: CreateUserDto) {
    const exists = await this.userService.findByEmail(dto.email);
    if (exists) throw new ConflictException('El correo ya está registrado');

    return this.userService.create(dto.email, dto.name, dto.password);
  }
}