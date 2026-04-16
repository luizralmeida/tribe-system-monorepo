import type { IUseCase } from '../../../domain/services/use-case.interface.js';
import type { IUserRepository } from '../../../domain/repositories/user.repository.interface.js';
import type { IHashService } from '../../../domain/services/hash.service.interface.js';
import { CreateUserDto } from '../../dtos/user/create-user.dto.js';
import { UserResponseDto } from '../../dtos/user/user-response.dto.js';
export declare class CreateUserUseCase implements IUseCase<CreateUserDto, UserResponseDto> {
    private readonly userRepository;
    private readonly hashService;
    constructor(userRepository: IUserRepository, hashService: IHashService);
    execute(input: CreateUserDto): Promise<UserResponseDto>;
    private validateUniqueness;
}
