import type { IUseCase } from '../../../domain/services/use-case.interface.js';
import type { IGuestRepository } from '../../../domain/repositories/guest.repository.interface.js';
import { DashboardResponseDto } from '../../dtos/guest/dashboard-response.dto.js';
export declare class GetEventDashboardUseCase implements IUseCase<number, DashboardResponseDto> {
    private readonly guestRepository;
    constructor(guestRepository: IGuestRepository);
    execute(eventId: number): Promise<DashboardResponseDto>;
}
