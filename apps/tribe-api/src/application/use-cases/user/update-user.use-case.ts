import {
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import type { IUseCase } from '../../../domain/services/use-case.interface.js';
import type { IUserRepository } from '../../../domain/repositories/user.repository.interface.js';
import { USER_REPOSITORY } from '../../../domain/repositories/user.repository.interface.js';
import type { IHashService } from '../../../domain/services/hash.service.interface.js';
import { HASH_SERVICE } from '../../../domain/services/hash.service.interface.js';
import { UpdateUserDto } from '../../dtos/user/update-user.dto.js';
import { UserResponseDto } from '../../dtos/user/user-response.dto.js';

interface UpdateUserInput {
  id: number;
  data: UpdateUserDto;
}

@Injectable()
export class UpdateUserUseCase
  implements IUseCase<UpdateUserInput, UserResponseDto>
{
  constructor(
    @Inject(USER_REPOSITORY) private readonly userRepository: IUserRepository,
    @Inject(HASH_SERVICE) private readonly hashService: IHashService,
  ) {}

  async execute(input: UpdateUserInput): Promise<UserResponseDto> {
    const existingUser = await this.userRepository.findById(input.id);

    if (!existingUser) {
      throw new NotFoundException(`User with id ${input.id} not found`);
    }

    await this.validateUniqueness(input.id, input.data);

    const updateData = { ...input.data };

    if (updateData.password) {
      updateData.password = await this.hashService.hash(updateData.password);
    }

    const user = await this.userRepository.update(input.id, updateData);
    return UserResponseDto.fromDomain(user);
  }

  private async validateUniqueness(
    userId: number,
    data: UpdateUserDto,
  ): Promise<void> {
    if (data.email) {
      const existing = await this.userRepository.findByEmail(data.email);
      if (existing && existing.id !== userId) {
        throw new ConflictException('Email already in use');
      }
    }

    if (data.phone) {
      const existing = await this.userRepository.findByPhone(data.phone);
      if (existing && existing.id !== userId) {
        throw new ConflictException('Phone already in use');
      }
    }
  }
}
