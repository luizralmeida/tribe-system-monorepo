import type { IUseCase } from '../../../domain/services/use-case.interface.js';
import type { IUserRepository } from '../../../domain/repositories/user.repository.interface.js';
import { PaginationWithFilterQueryDto, PaginatedResponseDto } from '../../dtos/pagination.dto.js';
import { UserResponseDto } from '../../dtos/user/user-response.dto.js';
export declare class FindUsersUseCase implements IUseCase<PaginationWithFilterQueryDto, PaginatedResponseDto<UserResponseDto>> {
    private readonly userRepository;
    constructor(userRepository: IUserRepository);
    private readonly logger;
    execute(input: PaginationWithFilterQueryDto): Promise<PaginatedResponseDto<UserResponseDto>>;
    private extractFilter;
}
