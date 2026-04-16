import { ConfigService } from '@nestjs/config';
import { Strategy } from 'passport-jwt';
import { ValidateSessionUseCase } from '../../../application/use-cases/auth/validate-session.use-case.js';
import { AuthUserDto } from '../../../application/dtos/auth/auth-response.dto.js';
interface JwtPayload {
    sub: number;
    email: string;
    role: string;
}
declare const JwtStrategy_base: new (...args: [opt: import("passport-jwt").StrategyOptionsWithRequest] | [opt: import("passport-jwt").StrategyOptionsWithoutRequest]) => Strategy & {
    validate(...args: any[]): unknown;
};
export declare class JwtStrategy extends JwtStrategy_base {
    private readonly validateSessionUseCase;
    constructor(configService: ConfigService, validateSessionUseCase: ValidateSessionUseCase);
    private readonly logger;
    validate(payload: JwtPayload): Promise<AuthUserDto>;
}
export {};
