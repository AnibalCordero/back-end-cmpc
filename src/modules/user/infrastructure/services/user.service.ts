import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { User } from '../../domain/entities/user.entity';

@Injectable()
export class UserService {
  async create(email: string, name: string, password: string, role = 'user') {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ email, name, password: hashedPassword, role });
    return user;
  }

  async findByEmail(email: string) {
    return User.findOne({ where: { email } });
  }
}