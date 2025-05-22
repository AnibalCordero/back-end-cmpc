
import { JwtService } from '@nestjs/jwt';
import { UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { User } from 'src/modules/user/domain/entities/user.entity';
import { AuthService } from 'src/modules/auth/infrastructure/services/auth.service';

jest.mock('bcrypt');

describe('AuthService', () => {
  let service: AuthService;
  let mockJwtService: JwtService;

  beforeEach(() => {
    mockJwtService = {
      sign: jest.fn(),
    } as any;

    service = new AuthService(mockJwtService);
  });

  describe('validateUser', () => {
    it('should return user if credentials are valid', async () => {
      const email = 'test@example.com';
      const password = '123456';
      const user = { id: 1, email, password: 'hashed', role: 'admin' } as User;

      jest.spyOn(User, 'findOne').mockResolvedValue(user);
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);

      const result = await service.validateUser(email, password);
      expect(User.findOne).toHaveBeenCalledWith({ where: { email } });
      expect(result).toEqual(user);
    });

    it('should throw UnauthorizedException if user is not found', async () => {
      jest.spyOn(User, 'findOne').mockResolvedValue(null);

      await expect(
        service.validateUser('notfound@test.com', '123456'),
      ).rejects.toThrow(UnauthorizedException);
    });

    it('should throw UnauthorizedException if password is incorrect', async () => {
      const user = { id: 1, email: 'test@example.com', password: 'hashed' } as User;

      jest.spyOn(User, 'findOne').mockResolvedValue(user);
      (bcrypt.compare as jest.Mock).mockResolvedValue(false);

      await expect(service.validateUser(user.email, 'wrong')).rejects.toThrow(UnauthorizedException);
    });
  });

  describe('login', () => {
    it('should return access_token', async () => {
      const user = { id: 1, email: 'test@example.com', role: 'admin' } as User;
      const token = 'jwt-token';

      jest.spyOn(mockJwtService, 'sign').mockReturnValue(token);

      const result = await service.login(user);

      expect(mockJwtService.sign).toHaveBeenCalledWith({
        sub: user.id,
        email: user.email,
        role: user.role,
      });

      expect(result).toEqual({ access_token: token });
    });
  });
});
