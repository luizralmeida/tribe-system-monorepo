import { Inject, Injectable } from '@nestjs/common';
import type { IUseCase } from '../../../domain/services/use-case.interface.js';
import type { IUserRepository } from '../../../domain/repositories/user.repository.interface.js';
import { USER_REPOSITORY } from '../../../domain/repositories/user.repository.interface.js';
import { PaginationQueryDto, PaginatedResponseDto } from '../../dtos/pagination.dto.js';
import { UserResponseDto } from '../../dtos/user/user-response.dto.js';

@Injectable()
export class FindUsersUseCase
  implements IUseCase<PaginationQueryDto, PaginatedResponseDto<UserResponseDto>>
{
  constructor(
    @Inject(USER_REPOSITORY) private readonly userRepository: IUserRepository,
  ) {}

  async execute(
    input: PaginationQueryDto,
  ): Promise<PaginatedResponseDto<UserResponseDto>> {
    const page = input.page ?? 1;
    const limit = input.limit ?? 20;

    const { data, total } = await this.userRepository.findAll({ page, limit });

    return new PaginatedResponseDto({
      data: data.map(UserResponseDto.fromDomain),
      total,
      page,
      limit,
    });
  }
}
