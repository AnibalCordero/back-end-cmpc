
import { ConfigService } from '@nestjs/config';
import { ExtractJwt } from 'passport-jwt';
import { JwtStrategy } from 'src/modules/auth/infrastructure/jwt.strategy';

describe('JwtStrategy', () => {
  let strategy: JwtStrategy;
  let mockConfigService: Partial<ConfigService>;

  beforeEach(() => {
    mockConfigService = {
      get: jest.fn().mockReturnValue('mock-secret'),
    };

    strategy = new JwtStrategy(mockConfigService as ConfigService);
  });

  it('should be defined', () => {
    expect(strategy).toBeDefined();
  });

  it('should validate payload correctly', async () => {
    const payload = {
      sub: 1,
      name: 'Test User',
      email: 'test@example.com',
      role: 'admin',
    };

    const result = await strategy.validate(payload);
    expect(result).toEqual({
      id: 1,
      name: 'Test User',
      email: 'test@example.com',
      role: 'admin',
    });
  });
});
