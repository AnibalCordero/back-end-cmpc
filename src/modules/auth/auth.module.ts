import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './infrastructure/services/auth.service';
import { AuthController } from './infrastructure/controllers/auth.controller';
import { LoginUseCase } from './application/login.use-case';
import { JwtStrategy } from './infrastructure/jwt.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (config: ConfigService) => ({
        secret: config.get<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: config.get<string>('JWT_EXPIRES_IN') || '3600s',
        },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, LoginUseCase],
})
export class AuthModule { }