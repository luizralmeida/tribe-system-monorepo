import { Module, forwardRef } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LoginUseCase } from '../../application/use-cases/auth/login.use-case.js';
import { ValidateSessionUseCase } from '../../application/use-cases/auth/validate-session.use-case.js';
import { BcryptHashService } from '../auth/services/bcrypt-hash.service.js';
import { JwtStrategy } from '../auth/strategies/jwt.strategy.js';
import { AuthController } from '../../presentation/controllers/auth.controller.js';
import { HASH_SERVICE } from '../../domain/services/hash.service.interface.js';
import { UserModule } from './user.module.js';

@Module({
  imports: [
    forwardRef(() => UserModule),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.getOrThrow<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: configService.get<string>('JWT_EXPIRATION', '8h') as any,
        },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [
    LoginUseCase,
    ValidateSessionUseCase,
    JwtStrategy,
    { provide: HASH_SERVICE, useClass: BcryptHashService },
  ],
  exports: [HASH_SERVICE, ValidateSessionUseCase],
})
export class AuthModule {}
