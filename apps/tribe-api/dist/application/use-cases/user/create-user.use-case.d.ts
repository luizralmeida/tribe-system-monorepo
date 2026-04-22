import type { IUseCase } from '../../../domain/services/use-case.interface.js';
import type { IUserRepository } from '../../../domain/repositories/user.repository.interface.js';
import type { IHashService } from '../../../domain/services/hash.service.interface.js';
import { CreateUserDto } from '../../dtos/user/create-user.dto.js';
import { UserResponseDto } from '../../dtos/user/user-response.dto.js';
import type { IUserEventRepository } from '../../../domain/repositories/user-event.repository.interface.js';
export declare class CreateUserUseCase implements IUseCase<CreateUserDto, UserResponseDto> {
    private readonly userRepository;
    private readonly hashService;
    private readonly userEventRepository;
    constructor(userRepository: IUserRepository, hashService: IHashService, userEventRepository: IUserEventRepository);
    execute(input: CreateUserDto): Promise<UserResponseDto>;
    private validateUniqueness;
}
