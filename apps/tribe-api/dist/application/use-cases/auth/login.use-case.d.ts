import { JwtService } from '@nestjs/jwt';
import type { IUseCase } from '../../../domain/services/use-case.interface.js';
import type { IUserRepository } from '../../../domain/repositories/user.repository.interface.js';
import type { IHashService } from '../../../domain/services/hash.service.interface.js';
import { LoginDto } from '../../dtos/auth/login.dto.js';
import { AuthResponseDto } from '../../dtos/auth/auth-response.dto.js';
export declare class LoginUseCase implements IUseCase<LoginDto, AuthResponseDto> {
    private readonly userRepository;
    private readonly hashService;
    private readonly jwtService;
    constructor(userRepository: IUserRepository, hashService: IHashService, jwtService: JwtService);
    execute(input: LoginDto): Promise<AuthResponseDto>;
}
