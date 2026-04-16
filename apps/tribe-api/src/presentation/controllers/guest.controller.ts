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
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Roles } from '../../infrastructure/auth/decorators/roles.decorator.js';
import { Public } from '../../infrastructure/auth/decorators/public.decorator.js';
import { UserRole } from '../../domain/enums/user-role.enum.js';
import { CreateGuestUseCase } from '../../application/use-cases/guest/create-guest.use-case.js';
import { FindGuestsByEventUseCase } from '../../application/use-cases/guest/find-guests-by-event.use-case.js';
import { UpdateGuestUseCase } from '../../application/use-cases/guest/update-guest.use-case.js';
import { DeleteGuestUseCase } from '../../application/use-cases/guest/delete-guest.use-case.js';
import { ConfirmGuestUseCase } from '../../application/use-cases/guest/confirm-guest.use-case.js';
import { UploadGuestsSpreadsheetUseCase } from '../../application/use-cases/guest/upload-guests-spreadsheet.use-case.js';
import { GetEventDashboardUseCase } from '../../application/use-cases/guest/get-event-dashboard.use-case.js';
import { CreateGuestDto } from '../../application/dtos/guest/create-guest.dto.js';
import { UpdateGuestDto } from '../../application/dtos/guest/update-guest.dto.js';
import { GuestFilterDto } from '../../application/dtos/guest/guest-filter.dto.js';

interface MulterFile {
  buffer: Buffer;
  originalname: string;
  mimetype: string;
}

@Controller()
export class GuestController {
  constructor(
    private readonly createGuestUseCase: CreateGuestUseCase,
    private readonly findGuestsByEventUseCase: FindGuestsByEventUseCase,
    private readonly updateGuestUseCase: UpdateGuestUseCase,
    private readonly deleteGuestUseCase: DeleteGuestUseCase,
    private readonly confirmGuestUseCase: ConfirmGuestUseCase,
    private readonly uploadGuestsSpreadsheetUseCase: UploadGuestsSpreadsheetUseCase,
    private readonly getEventDashboardUseCase: GetEventDashboardUseCase,
  ) {}

  @Get('events/:eventId/guests')
  @Roles(UserRole.SUPER, UserRole.EDIT, UserRole.VIEW)
  async findByEvent(
    @Param('eventId', ParseIntPipe) eventId: number,
    @Query() filters: GuestFilterDto,
  ) {
    return this.findGuestsByEventUseCase.execute({ ...filters, eventId });
  }

  @Get('events/:eventId/guests/dashboard')
  @Roles(UserRole.SUPER, UserRole.EDIT, UserRole.VIEW)
  async getDashboard(@Param('eventId', ParseIntPipe) eventId: number) {
    return this.getEventDashboardUseCase.execute(eventId);
  }

  @Post('events/:eventId/guests')
  @Roles(UserRole.SUPER, UserRole.EDIT)
  async create(
    @Param('eventId', ParseIntPipe) eventId: number,
    @Body() dto: CreateGuestDto,
  ) {
    return this.createGuestUseCase.execute({ eventId, data: dto });
  }

  @Post('events/:eventId/guests/upload')
  @Roles(UserRole.SUPER, UserRole.EDIT)
  @UseInterceptors(FileInterceptor('file'))
  async upload(
    @Param('eventId', ParseIntPipe) eventId: number,
    @UploadedFile() file: MulterFile,
  ) {
    return this.uploadGuestsSpreadsheetUseCase.execute({
      eventId,
      buffer: file.buffer,
    });
  }

  @Put('events/:eventId/guests/:id')
  @Roles(UserRole.SUPER, UserRole.EDIT)
  async update(
    @Param('eventId', ParseIntPipe) eventId: number,
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateGuestDto,
  ) {
    return this.updateGuestUseCase.execute({ id, eventId, data: dto });
  }

  @Delete('events/:eventId/guests/:id')
  @Roles(UserRole.SUPER, UserRole.EDIT)
  async delete(
    @Param('eventId', ParseIntPipe) eventId: number,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.deleteGuestUseCase.execute({ id, eventId });
  }

  @Public()
  @Post('guests/confirm/:token')
  async confirm(@Param('token') token: string) {
    return this.confirmGuestUseCase.execute({ token });
  }
}
