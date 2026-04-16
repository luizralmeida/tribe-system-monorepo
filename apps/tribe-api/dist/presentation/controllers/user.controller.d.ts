import { CreateUserUseCase } from '../../application/use-cases/user/create-user.use-case.js';
import { FindUsersUseCase } from '../../application/use-cases/user/find-users.use-case.js';
import { FindUserByIdUseCase } from '../../application/use-cases/user/find-user-by-id.use-case.js';
import { GetUserStatsUseCase } from '../../application/use-cases/user/get-user-stats.use-case.js';
import { UpdateUserUseCase } from '../../application/use-cases/user/update-user.use-case.js';
import { DeleteUserUseCase } from '../../application/use-cases/user/delete-user.use-case.js';
import { CreateUserDto } from '../../application/dtos/user/create-user.dto.js';
import { UpdateUserDto } from '../../application/dtos/user/update-user.dto.js';
import { UserResponseDto } from '../../application/dtos/user/user-response.dto.js';
import { PaginationWithFilterQueryDto, PaginatedResponseDto } from '../../application/dtos/pagination.dto.js';
export declare class UserController {
    private readonly createUserUseCase;
    private readonly findUsersUseCase;
    private readonly findUserByIdUseCase;
    private readonly getUserStatsUseCase;
    private readonly updateUserUseCase;
    private readonly deleteUserUseCase;
    constructor(createUserUseCase: CreateUserUseCase, findUsersUseCase: FindUsersUseCase, findUserByIdUseCase: FindUserByIdUseCase, getUserStatsUseCase: GetUserStatsUseCase, updateUserUseCase: UpdateUserUseCase, deleteUserUseCase: DeleteUserUseCase);
    create(dto: CreateUserDto): Promise<UserResponseDto>;
    findAll(query: PaginationWithFilterQueryDto): Promise<PaginatedResponseDto<UserResponseDto>>;
    getStats(): Promise<import("../../application/dtos/user/user-stats.dto.js").UserStatsResponseDto>;
    findById(id: number): Promise<UserResponseDto>;
    update(id: number, dto: UpdateUserDto): Promise<UserResponseDto>;
    delete(id: number): Promise<void>;
}
