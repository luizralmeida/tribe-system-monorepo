import type { IUseCase } from '../../../domain/services/use-case.interface.js';
import type { IUserRepository } from '../../../domain/repositories/user.repository.interface.js';
import { AuthUserDto } from '../../dtos/auth/auth-response.dto.js';
interface ValidateSessionInput {
    userId: number;
}
export declare class ValidateSessionUseCase implements IUseCase<ValidateSessionInput, AuthUserDto> {
    private readonly userRepository;
    constructor(userRepository: IUserRepository);
    execute(input: ValidateSessionInput): Promise<AuthUserDto>;
}
export {};
