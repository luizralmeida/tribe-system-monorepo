import { Inject, Injectable } from '@nestjs/common';
import type { IUserRepository } from '../../../domain/repositories/user.repository.interface.js';
import { USER_REPOSITORY } from '../../../domain/repositories/user.repository.interface.js';
import { UserStatsResponseDto } from '../../dtos/user/user-stats.dto.js';
import { Logger } from '@nestjs/common';

@Injectable()
export class GetUserStatsUseCase {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: IUserRepository,
  ) {}

  private readonly logger = new Logger(GetUserStatsUseCase.name);

  async execute(): Promise<UserStatsResponseDto> {
    this.logger.debug("[execute] Searching for users stats")
    let stats;
    try {
      stats = await this.userRepository.getStats();
    } catch (error) {
      this.logger.error("[execute] Failed to search for users stats", error);
      throw error;
    }
    
    this.logger.log(`[execute] Succeded with ${stats.total} users stats`);
    return {
      total: stats.total,
      active: stats.active,
      withFutureEvents: stats.withFutureEvents,
      admin: stats.admin
    };
  }
}
