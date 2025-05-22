import { Injectable } from '@nestjs/common';
import { AuthService } from '../infrastructure/services/auth.service';

@Injectable()
export class LoginUseCase {
  constructor(private readonly authService: AuthService) { }

  async execute(email: string, password: string) {
    const user = await this.authService.validateUser(email, password);
    return this.authService.login(user);
  }
}