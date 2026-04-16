import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ValidateSessionUseCase } from '../../../application/use-cases/auth/validate-session.use-case.js';
import { AuthUserDto } from '../../../application/dtos/auth/auth-response.dto.js';

interface JwtPayload {
  sub: number;
  email: string;
  role: string;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    configService: ConfigService,
    private readonly validateSessionUseCase: ValidateSessionUseCase,
  ) {
    const secretOrKey = configService.getOrThrow<string>('JWT_SECRET');

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey,
    });
  }

  private readonly logger = new Logger(JwtStrategy.name);

  async validate(payload: JwtPayload): Promise<AuthUserDto> {
    this.logger.log(`[validate] Processing validation for user ID: ${payload.sub}`);
    return this.validateSessionUseCase.execute({ userId: payload.sub });
  }
}
