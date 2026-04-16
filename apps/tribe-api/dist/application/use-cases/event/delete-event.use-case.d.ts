import type { IUseCase } from '../../../domain/services/use-case.interface.js';
import type { IEventRepository } from '../../../domain/repositories/event.repository.interface.js';
export declare class DeleteEventUseCase implements IUseCase<number, void> {
    private readonly eventRepository;
    constructor(eventRepository: IEventRepository);
    execute(id: number): Promise<void>;
}
