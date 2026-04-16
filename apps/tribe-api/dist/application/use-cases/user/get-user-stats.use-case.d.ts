import type { IUserRepository } from '../../../domain/repositories/user.repository.interface.js';
import { UserStatsResponseDto } from '../../dtos/user/user-stats.dto.js';
export declare class GetUserStatsUseCase {
    private readonly userRepository;
    constructor(userRepository: IUserRepository);
    private readonly logger;
    execute(): Promise<UserStatsResponseDto>;
}
