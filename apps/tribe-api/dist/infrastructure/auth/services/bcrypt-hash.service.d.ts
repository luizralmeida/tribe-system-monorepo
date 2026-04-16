import { ConfigService } from '@nestjs/config';
import { IHashService } from '../../../domain/services/hash.service.interface.js';
export declare class BcryptHashService implements IHashService {
    private readonly configService;
    private readonly saltRounds;
    constructor(configService: ConfigService);
    hash(plain: string): Promise<string>;
    compare(plain: string, hashed: string): Promise<boolean>;
}
