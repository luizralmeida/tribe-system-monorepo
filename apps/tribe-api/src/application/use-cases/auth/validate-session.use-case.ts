import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import type { IUseCase } from '../../../domain/services/use-case.interface.js';
import type { IUserRepository } from '../../../domain/repositories/user.repository.interface.js';
import { USER_REPOSITORY } from '../../../domain/repositories/user.repository.interface.js';
import { AuthUserDto } from '../../dtos/auth/auth-response.dto.js';

interface ValidateSessionInput {
  userId: number;
}

@Injectable()
export class ValidateSessionUseCase
  implements IUseCase<ValidateSessionInput, AuthUserDto>
{
  constructor(
    @Inject(USER_REPOSITORY) private readonly userRepository: IUserRepository,
  ) {}

  async execute(input: ValidateSessionInput): Promise<AuthUserDto> {
    const user = await this.userRepository.findById(input.userId);

    if (!user || !user.active) {
      throw new UnauthorizedException('Session expired or user inactive');
    }

    return new AuthUserDto({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    });
  }
}
