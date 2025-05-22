import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from 'src/modules/user/domain/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) { }

  async validateUser(email: string, password: string) {
    const user = await User.findOne({ where: { email } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Credenciales inválidas');
    }
    return user;
  }

  async login(user: User) {
    const payload = { sub: user.id, email: user.email, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}