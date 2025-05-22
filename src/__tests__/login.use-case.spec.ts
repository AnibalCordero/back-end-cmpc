import { LoginUseCase } from "src/modules/auth/application/login.use-case";
import { AuthService } from "src/modules/auth/infrastructure/services/auth.service";
import { User } from "src/modules/user/domain/entities/user.entity";


describe('LoginUseCase', () => {
  let useCase: LoginUseCase;
  let mockAuthService: jest.Mocked<AuthService>;

  beforeEach(() => {
    mockAuthService = {
      validateUser: jest.fn(),
      login: jest.fn(),
    } as any;

    useCase = new LoginUseCase(mockAuthService);
  });

  it('should validate user and call login', async () => {
    const email = 'test@example.com';
    const password = 'securepass';

    const mockUser = { id: 1, email };
    const mockToken = { access_token: 'jwt-token' };

    mockAuthService.validateUser.mockResolvedValue(mockUser as User);
    mockAuthService.login.mockResolvedValue(mockToken);

    const result = await useCase.execute(email, password);

    expect(mockAuthService.validateUser).toHaveBeenCalledWith(email, password);
    expect(mockAuthService.login).toHaveBeenCalledWith(mockUser);
    expect(result).toEqual(mockToken);
  });
});
