import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  Request,
} from '@nestjs/common';
import { Roles } from '../../infrastructure/auth/decorators/roles.decorator.js';
import { UserRole } from '../../domain/enums/user-role.enum.js';
import { CreateEventUseCase } from '../../application/use-cases/event/create-event.use-case.js';
import { FindEventsUseCase } from '../../application/use-cases/event/find-events.use-case.js';
import { FindEventByIdUseCase } from '../../application/use-cases/event/find-event-by-id.use-case.js';
import { FindEventWithUsersUseCase } from '../../application/use-cases/event/find-event-with-users.use-case.js';
import { UpdateEventUseCase } from '../../application/use-cases/event/update-event.use-case.js';
import { DeleteEventUseCase } from '../../application/use-cases/event/delete-event.use-case.js';
import {
  AssociateUserEventUseCase,
  DissociateUserEventUseCase,
} from '../../application/use-cases/event/associate-user-event.use-case.js';
import { GetEventStatsUseCase } from '../../application/use-cases/event/get-event-stats.use-case.js';
import { CreateEventDto } from '../../application/dtos/event/create-event.dto.js';
import { UpdateEventDto } from '../../application/dtos/event/update-event.dto.js';
import { AssociateUserEventDto } from '../../application/dtos/event/associate-user-event.dto.js';
import { PaginationQueryDto } from '../../application/dtos/pagination.dto.js';

interface AuthenticatedRequest {
  user: { id: number; role: UserRole };
}

@Controller('events')
export class EventController {
  constructor(
    private readonly createEventUseCase: CreateEventUseCase,
    private readonly findEventsUseCase: FindEventsUseCase,
    private readonly findEventByIdUseCase: FindEventByIdUseCase,
    private readonly getEventStatsUseCase: GetEventStatsUseCase,
    private readonly findEventWithUsersUseCase: FindEventWithUsersUseCase,
    private readonly updateEventUseCase: UpdateEventUseCase,
    private readonly deleteEventUseCase: DeleteEventUseCase,
    private readonly associateUserEventUseCase: AssociateUserEventUseCase,
    private readonly dissociateUserEventUseCase: DissociateUserEventUseCase,
  ) {}

  @Post()
  @Roles(UserRole.SUPER)
  async create(@Body() dto: CreateEventDto) {
    return this.createEventUseCase.execute(dto);
  }

  @Get()
  @Roles(UserRole.SUPER, UserRole.EDIT, UserRole.VIEW)
  async findAll(
    @Query() query: PaginationQueryDto,
    @Request() req: AuthenticatedRequest,
  ) {
    return this.findEventsUseCase.execute({
      ...query,
      userId: req.user.id,
      userRole: req.user.role,
    });
  }

  @Get('stats')
  @Roles(UserRole.SUPER, UserRole.EDIT, UserRole.VIEW)
  async getStats(@Request() req: AuthenticatedRequest) {
    return this.getEventStatsUseCase.execute({
      userId: req.user.id,
      userRole: req.user.role,
    });
  }

  @Get(':id')
  @Roles(UserRole.SUPER, UserRole.EDIT, UserRole.VIEW)
  async findById(
    @Param('id', ParseIntPipe) id: number,
    @Request() req: AuthenticatedRequest,
  ) {
    return this.findEventByIdUseCase.execute({
      eventId: id,
      userId: req.user.id,
      userRole: req.user.role,
    });
  }

  @Get(':id/users')
  @Roles(UserRole.SUPER)
  async findWithUsers(@Param('id', ParseIntPipe) id: number) {
    return this.findEventWithUsersUseCase.execute(id);
  }

  @Put(':id')
  @Roles(UserRole.SUPER)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateEventDto,
  ) {
    return this.updateEventUseCase.execute({ id, data: dto });
  }

  @Delete(':id')
  @Roles(UserRole.SUPER)
  async delete(@Param('id', ParseIntPipe) id: number) {
    return this.deleteEventUseCase.execute(id);
  }

  @Post(':id/users')
  @Roles(UserRole.SUPER)
  async associateUser(
    @Param('id', ParseIntPipe) eventId: number,
    @Body() dto: AssociateUserEventDto,
  ) {
    return this.associateUserEventUseCase.execute({
      eventId,
      userId: dto.userId,
    });
  }

  @Delete(':id/users/:userId')
  @Roles(UserRole.SUPER)
  async dissociateUser(
    @Param('id', ParseIntPipe) eventId: number,
    @Param('userId', ParseIntPipe) userId: number,
  ) {
    return this.dissociateUserEventUseCase.execute({ eventId, userId });
  }
}
