import { Injectable } from '@nestjs/common';
import { IUserLogged } from '../domain/entities/user.interface';

@Injectable()
export class GetOneUserUseCase {
  async execute(user: IUserLogged) {
    return user;
  }
}