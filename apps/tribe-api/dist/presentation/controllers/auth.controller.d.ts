import { LoginUseCase } from '../../application/use-cases/auth/login.use-case.js';
import { LoginDto } from '../../application/dtos/auth/login.dto.js';
import { AuthResponseDto, AuthUserDto } from '../../application/dtos/auth/auth-response.dto.js';
interface AuthenticatedRequest {
    user: AuthUserDto;
}
export declare class AuthController {
    private readonly loginUseCase;
    constructor(loginUseCase: LoginUseCase);
    login(loginDto: LoginDto): Promise<AuthResponseDto>;
    getProfile(req: AuthenticatedRequest): AuthUserDto;
}
export {};
