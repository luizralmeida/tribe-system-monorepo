import type { IUseCase } from '../../../domain/services/use-case.interface.js';
import type { IEventRepository } from '../../../domain/repositories/event.repository.interface.js';
import type { IUserEventRepository } from '../../../domain/repositories/user-event.repository.interface.js';
import type { IUserRepository } from '../../../domain/repositories/user.repository.interface.js';
import { UserEvent } from '../../../domain/entities/user-event.entity.js';
interface AssociateInput {
    eventId: number;
    userId: number;
}
interface DissociateInput {
    eventId: number;
    userId: number;
}
export declare class AssociateUserEventUseCase implements IUseCase<AssociateInput, UserEvent> {
    private readonly eventRepository;
    private readonly userEventRepository;
    private readonly userRepository;
    constructor(eventRepository: IEventRepository, userEventRepository: IUserEventRepository, userRepository: IUserRepository);
    execute(input: AssociateInput): Promise<UserEvent>;
    private validateEntities;
}
export declare class DissociateUserEventUseCase implements IUseCase<DissociateInput, void> {
    private readonly userEventRepository;
    constructor(userEventRepository: IUserEventRepository);
    execute(input: DissociateInput): Promise<void>;
}
export {};
