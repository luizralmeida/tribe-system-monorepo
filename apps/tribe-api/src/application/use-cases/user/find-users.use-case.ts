import { Inject, Injectable, Logger } from '@nestjs/common';
import type { IUseCase } from '../../../domain/services/use-case.interface.js';
import type { IUserRepository } from '../../../domain/repositories/user.repository.interface.js';
import { USER_REPOSITORY } from '../../../domain/repositories/user.repository.interface.js';
import { PaginationWithFilterQueryDto, PaginatedResponseDto } from '../../dtos/pagination.dto.js';
import { UserResponseDto } from '../../dtos/user/user-response.dto.js';
import { getOnlyNumbers } from '../../utils/get-only-numbers.util.js';

@Injectable()
export class FindUsersUseCase
  implements IUseCase<PaginationWithFilterQueryDto, PaginatedResponseDto<UserResponseDto>>
{
  constructor(
    @Inject(USER_REPOSITORY) 
    private readonly userRepository: IUserRepository,
  ) {}

  private readonly logger = new Logger(FindUsersUseCase.name);

  async execute(
    input: PaginationWithFilterQueryDto,
  ): Promise<PaginatedResponseDto<UserResponseDto>> {
    this.logger.debug("[execute] Searching for users")
    const page = input.page ?? 1;
    const limit = input.limit ?? 20;

    const filter = this.extractFilter(input.search);

    const { data, total } = await this.userRepository.findAll({ page, limit, filter });

    this.logger.log(`[execute] Succeded with ${total} users`);

    return new PaginatedResponseDto({
      data: data.map(UserResponseDto.fromDomain),
      total,
      page,
      limit,
    });
  }

  private extractFilter(search?: string) {
    if (!search) {
       return {};
    }

    if (search.includes('@')) {
      return { email: search };
    }

    if (getOnlyNumbers(search)) {
      return { phone: search };
    }

    return { name: search };
  }
}

