import type { IUseCase } from '../../../domain/services/use-case.interface.js';
import type { IUserRepository } from '../../../domain/repositories/user.repository.interface.js';
export declare class DeleteUserUseCase implements IUseCase<number, void> {
    private readonly userRepository;
    constructor(userRepository: IUserRepository);
    execute(id: number): Promise<void>;
}
