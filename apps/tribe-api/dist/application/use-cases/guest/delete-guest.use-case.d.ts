import type { IUseCase } from '../../../domain/services/use-case.interface.js';
import type { IGuestRepository } from '../../../domain/repositories/guest.repository.interface.js';
interface DeleteGuestInput {
    id: number;
    eventId: number;
}
export declare class DeleteGuestUseCase implements IUseCase<DeleteGuestInput, void> {
    private readonly guestRepository;
    constructor(guestRepository: IGuestRepository);
    execute(input: DeleteGuestInput): Promise<void>;
}
export {};
