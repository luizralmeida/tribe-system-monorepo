import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventTypeOrmEntity } from '../persistence/entities/event.typeorm-entity.js';
import { UserEventTypeOrmEntity } from '../persistence/entities/user-event.typeorm-entity.js';
import { EventTypeOrmRepository } from '../persistence/repositories/event.typeorm-repository.js';
import { UserEventTypeOrmRepository } from '../persistence/repositories/user-event.typeorm-repository.js';
import { EVENT_REPOSITORY } from '../../domain/repositories/event.repository.interface.js';
import { USER_EVENT_REPOSITORY } from '../../domain/repositories/user-event.repository.interface.js';
import { CreateEventUseCase } from '../../application/use-cases/event/create-event.use-case.js';
import { FindEventsUseCase } from '../../application/use-cases/event/find-events.use-case.js';
import { FindEventByIdUseCase } from '../../application/use-cases/event/find-event-by-id.use-case.js';
import { GetEventStatsUseCase } from '../../application/use-cases/event/get-event-stats.use-case.js';
import { FindEventWithUsersUseCase } from '../../application/use-cases/event/find-event-with-users.use-case.js';
import { UpdateEventUseCase } from '../../application/use-cases/event/update-event.use-case.js';
import { DeleteEventUseCase } from '../../application/use-cases/event/delete-event.use-case.js';
import {
  AssociateUserEventUseCase,
  DissociateUserEventUseCase,
} from '../../application/use-cases/event/associate-user-event.use-case.js';
import { EventController } from '../../presentation/controllers/event.controller.js';
import { UserModule } from './user.module.js';
import { AddressModule } from './address.module.js';

@Module({
  imports: [
    TypeOrmModule.forFeature([EventTypeOrmEntity, UserEventTypeOrmEntity]),
    forwardRef(() => UserModule),
    AddressModule,
  ],
  controllers: [EventController],
  providers: [
    { provide: EVENT_REPOSITORY, useClass: EventTypeOrmRepository },
    { provide: USER_EVENT_REPOSITORY, useClass: UserEventTypeOrmRepository },
    CreateEventUseCase,
    FindEventsUseCase,
    FindEventByIdUseCase,
    GetEventStatsUseCase,
    FindEventWithUsersUseCase,
    UpdateEventUseCase,
    DeleteEventUseCase,
    AssociateUserEventUseCase,
    DissociateUserEventUseCase,
  ],
  exports: [EVENT_REPOSITORY, USER_EVENT_REPOSITORY],
})
export class EventModule {}
