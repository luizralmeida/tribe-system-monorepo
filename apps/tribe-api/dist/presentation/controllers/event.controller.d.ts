import { UserRole } from '../../domain/enums/user-role.enum.js';
import { CreateEventUseCase } from '../../application/use-cases/event/create-event.use-case.js';
import { FindEventsUseCase } from '../../application/use-cases/event/find-events.use-case.js';
import { FindEventByIdUseCase } from '../../application/use-cases/event/find-event-by-id.use-case.js';
import { FindEventWithUsersUseCase } from '../../application/use-cases/event/find-event-with-users.use-case.js';
import { UpdateEventUseCase } from '../../application/use-cases/event/update-event.use-case.js';
import { DeleteEventUseCase } from '../../application/use-cases/event/delete-event.use-case.js';
import { AssociateUserEventUseCase, DissociateUserEventUseCase } from '../../application/use-cases/event/associate-user-event.use-case.js';
import { GetEventStatsUseCase } from '../../application/use-cases/event/get-event-stats.use-case.js';
import { CreateEventDto } from '../../application/dtos/event/create-event.dto.js';
import { UpdateEventDto } from '../../application/dtos/event/update-event.dto.js';
import { AssociateUserEventDto } from '../../application/dtos/event/associate-user-event.dto.js';
import { FindEventsQueryDto } from '../../application/dtos/event/find-events-query.dto.js';
interface AuthenticatedRequest {
    user: {
        id: number;
        role: UserRole;
    };
}
export declare class EventController {
    private readonly createEventUseCase;
    private readonly findEventsUseCase;
    private readonly findEventByIdUseCase;
    private readonly getEventStatsUseCase;
    private readonly findEventWithUsersUseCase;
    private readonly updateEventUseCase;
    private readonly deleteEventUseCase;
    private readonly associateUserEventUseCase;
    private readonly dissociateUserEventUseCase;
    constructor(createEventUseCase: CreateEventUseCase, findEventsUseCase: FindEventsUseCase, findEventByIdUseCase: FindEventByIdUseCase, getEventStatsUseCase: GetEventStatsUseCase, findEventWithUsersUseCase: FindEventWithUsersUseCase, updateEventUseCase: UpdateEventUseCase, deleteEventUseCase: DeleteEventUseCase, associateUserEventUseCase: AssociateUserEventUseCase, dissociateUserEventUseCase: DissociateUserEventUseCase);
    create(dto: CreateEventDto): Promise<import("../../application/dtos/event/event-response.dto.js").EventResponseDto>;
    findAll(query: FindEventsQueryDto, req: AuthenticatedRequest): Promise<import("../../application/dtos/pagination.dto.js").PaginatedResponseDto<import("../../application/dtos/event/event-response.dto.js").EventResponseDto>>;
    getStats(req: AuthenticatedRequest): Promise<import("../../application/dtos/event/event-stats.dto.js").EventStatsResponseDto>;
    findById(id: number, req: AuthenticatedRequest): Promise<import("../../application/dtos/event/event-response.dto.js").EventResponseDto>;
    findWithUsers(id: number): Promise<import("../../application/dtos/event/event-response.dto.js").EventWithUsersResponseDto>;
    update(id: number, dto: UpdateEventDto): Promise<import("../../application/dtos/event/event-response.dto.js").EventResponseDto>;
    delete(id: number): Promise<void>;
    associateUser(eventId: number, dto: AssociateUserEventDto): Promise<import("../../domain/entities/user-event.entity.js").UserEvent>;
    dissociateUser(eventId: number, userId: number): Promise<void>;
}
export {};
