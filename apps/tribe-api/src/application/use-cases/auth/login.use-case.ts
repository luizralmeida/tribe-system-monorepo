import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import type { IUseCase } from '../../../domain/services/use-case.interface.js';
import type { IUserRepository } from '../../../domain/repositories/user.repository.interface.js';
import { USER_REPOSITORY } from '../../../domain/repositories/user.repository.interface.js';
import type { IHashService } from '../../../domain/services/hash.service.interface.js';
import { HASH_SERVICE } from '../../../domain/services/hash.service.interface.js';
import { LoginDto } from '../../dtos/auth/login.dto.js';
import { AuthResponseDto, AuthUserDto } from '../../dtos/auth/auth-response.dto.js';

@Injectable()
export class LoginUseCase implements IUseCase<LoginDto, AuthResponseDto> {
  constructor(
    @Inject(USER_REPOSITORY) private readonly userRepository: IUserRepository,
    @Inject(HASH_SERVICE) private readonly hashService: IHashService,
    private readonly jwtService: JwtService,
  ) {}

  async execute(input: LoginDto): Promise<AuthResponseDto> {
    const user = await this.userRepository.findByEmail(input.email);

    if (!user || !user.active) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await this.hashService.compare(
      input.password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { sub: user.id, email: user.email, role: user.role };
    const accessToken = this.jwtService.sign(payload);

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
}
