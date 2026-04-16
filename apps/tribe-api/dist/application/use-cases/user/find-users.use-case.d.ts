import type { IUseCase } from '../../../domain/services/use-case.interface.js';
import type { IUserRepository } from '../../../domain/repositories/user.repository.interface.js';
import { PaginationQueryDto, PaginatedResponseDto } from '../../dtos/pagination.dto.js';
import { UserResponseDto } from '../../dtos/user/user-response.dto.js';
export declare class FindUsersUseCase implements IUseCase<PaginationQueryDto, PaginatedResponseDto<UserResponseDto>> {
    private readonly userRepository;
    constructor(userRepository: IUserRepository);
    execute(input: PaginationQueryDto): Promise<PaginatedResponseDto<UserResponseDto>>;
}
