import type { IUseCase } from '../../../domain/services/use-case.interface.js';
import type { IUserRepository } from '../../../domain/repositories/user.repository.interface.js';
import { UserResponseDto } from '../../dtos/user/user-response.dto.js';
export declare class FindUserByIdUseCase implements IUseCase<number, UserResponseDto> {
    private readonly userRepository;
    constructor(userRepository: IUserRepository);
    execute(id: number): Promise<UserResponseDto>;
}
