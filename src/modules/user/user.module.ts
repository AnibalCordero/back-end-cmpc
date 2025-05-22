import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserService } from './infrastructure/services/user.service';
import { User } from './domain/entities/user.entity';
import { UserController } from './infrastructure/controllers/user.controller';
import { CreateUserUseCase } from './application/user-create.use-case';
import { GetOneUserUseCase } from './application/user-get-one.use-case';

@Module({
  imports: [SequelizeModule.forFeature([User])],
  providers: [UserService, CreateUserUseCase, GetOneUserUseCase],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule { }