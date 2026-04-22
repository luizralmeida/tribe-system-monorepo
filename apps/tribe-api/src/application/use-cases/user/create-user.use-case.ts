import {
  ConflictException,
  Inject,
  Injectable,
} from '@nestjs/common';
import type { IUseCase } from '../../../domain/services/use-case.interface.js';
import type { IUserRepository } from '../../../domain/repositories/user.repository.interface.js';
import { USER_REPOSITORY } from '../../../domain/repositories/user.repository.interface.js';
import type { IHashService } from '../../../domain/services/hash.service.interface.js';
import { HASH_SERVICE } from '../../../domain/services/hash.service.interface.js';
import { CreateUserDto } from '../../dtos/user/create-user.dto.js';
import { UserResponseDto } from '../../dtos/user/user-response.dto.js';
import type { IUserEventRepository } from '../../../domain/repositories/user-event.repository.interface.js';
import { USER_EVENT_REPOSITORY } from '../../../domain/repositories/user-event.repository.interface.js';

@Injectable()
export class CreateUserUseCase
  implements IUseCase<CreateUserDto, UserResponseDto>
{
  constructor(
    @Inject(USER_REPOSITORY) private readonly userRepository: IUserRepository,
    @Inject(HASH_SERVICE) private readonly hashService: IHashService,
    @Inject(USER_EVENT_REPOSITORY) private readonly userEventRepository: IUserEventRepository,
  ) {}

  async execute(input: CreateUserDto): Promise<UserResponseDto> {
    await this.validateUniqueness(input.email, input.phone);

    const hashedPassword = await this.hashService.hash(input.password);

    const user = await this.userRepository.save({
      ...input,
      password: hashedPassword,
    });

    if (input.eventIds?.length) {
      await Promise.all(
        input.eventIds.map((id) => this.userEventRepository.associate(user.id, id)),
      );
    }

    return UserResponseDto.fromDomain(user);
  }

  private async validateUniqueness(
    email: string,
    phone: string,
  ): Promise<void> {
    const emailExists = await this.userRepository.existsByEmail(email);
    if (emailExists) {
      throw new ConflictException('Email already in use');
    }

    const phoneExists = await this.userRepository.existsByPhone(phone);
    if (phoneExists) {
      throw new ConflictException('Phone already in use');
    }
  }
}
