import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import type { IUseCase } from '../../../domain/services/use-case.interface.js';
import type { IUserRepository } from '../../../domain/repositories/user.repository.interface.js';
import { USER_REPOSITORY } from '../../../domain/repositories/user.repository.interface.js';
import type { IHashService } from '../../../domain/services/hash.service.interface.js';
import { HASH_SERVICE } from '../../../domain/services/hash.service.interface.js';
import { LoginDto } from '../../dtos/auth/login.dto.js';
import { AuthResponseDto, AuthUserDto } from '../../dtos/auth/auth-response.dto.js';
import { Logger } from '@nestjs/common';
import { UserRole } from 'src/domain/enums/user-role.enum.js';

@Injectable()
export class LoginUseCase implements IUseCase<LoginDto, AuthResponseDto> {
  constructor(
    @Inject(USER_REPOSITORY) private readonly userRepository: IUserRepository,
    @Inject(HASH_SERVICE) private readonly hashService: IHashService,
    private readonly jwtService: JwtService,
  ) {}
  private readonly logger = new Logger(LoginUseCase.name)

  async execute(input: LoginDto): Promise<AuthResponseDto> {
    this.logger.debug(`[execute] Login attempt for user: ${input.email}`);

    const rootLogin = await this.handleRootLogin(input);
    if (rootLogin != null) {
      return rootLogin;
    }

    const user = await this.userRepository.findByEmail(input.email);

    if (!user || !user.active) {
      this.logger.error(`[execute] User not found or inactive: ${input.email}`);
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await this.hashService.compare(
      input.password,
      user.password,
    );

    if (!isPasswordValid) {
      this.logger.error(`[execute] Invalid password for user: ${input.email}`);
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { sub: user.id, email: user.email, role: user.role };
    const accessToken = this.jwtService.sign(payload);

    this.logger.debug(`[execute] User logged in successfully: ${input.email}`);

    return new AuthResponseDto({
      accessToken,
      user: new AuthUserDto({
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      }),
    });
  }

  private async handleRootLogin(input: LoginDto): Promise<AuthResponseDto | null> {
    if (input.email === process.env.ROOT_USER && input.password === process.env.ROOT_PASSWORD) {
      const payload = { sub: 0, email: input.email, role: UserRole.SUPER };
      const accessToken = this.jwtService.sign(payload);
      return new AuthResponseDto({
        accessToken,
        user: new AuthUserDto({
          id: 0,
          name: 'Root',
          email: input.email,
          role: UserRole.SUPER,
        }),
      });
    }

    return null;
  }
}
