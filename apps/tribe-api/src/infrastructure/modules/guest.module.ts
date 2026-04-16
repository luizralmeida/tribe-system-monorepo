import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GuestTypeOrmEntity } from '../persistence/entities/guest.typeorm-entity.js';
import { GuestTypeOrmRepository } from '../persistence/repositories/guest.typeorm-repository.js';
import { GUEST_REPOSITORY } from '../../domain/repositories/guest.repository.interface.js';
import { CreateGuestUseCase } from '../../application/use-cases/guest/create-guest.use-case.js';
import { FindGuestsByEventUseCase } from '../../application/use-cases/guest/find-guests-by-event.use-case.js';
import { UpdateGuestUseCase } from '../../application/use-cases/guest/update-guest.use-case.js';
import { DeleteGuestUseCase } from '../../application/use-cases/guest/delete-guest.use-case.js';
import { ConfirmGuestUseCase } from '../../application/use-cases/guest/confirm-guest.use-case.js';
import { UploadGuestsSpreadsheetUseCase } from '../../application/use-cases/guest/upload-guests-spreadsheet.use-case.js';
import { GetEventDashboardUseCase } from '../../application/use-cases/guest/get-event-dashboard.use-case.js';
import { SpreadsheetParserService } from '../../application/services/spreadsheet-parser.service.js';
import { GuestController } from '../../presentation/controllers/guest.controller.js';

@Module({
  imports: [
    TypeOrmModule.forFeature([GuestTypeOrmEntity]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.getOrThrow<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: configService.get<string>('JWT_EXPIRATION', '8h') as any,
        },
      }),
    }),
  ],
  controllers: [GuestController],
  providers: [
    { provide: GUEST_REPOSITORY, useClass: GuestTypeOrmRepository },
    CreateGuestUseCase,
    FindGuestsByEventUseCase,
    UpdateGuestUseCase,
    DeleteGuestUseCase,
    ConfirmGuestUseCase,
    UploadGuestsSpreadsheetUseCase,
    GetEventDashboardUseCase,
    SpreadsheetParserService,
  ],
  exports: [GUEST_REPOSITORY],
})
export class GuestModule {}
