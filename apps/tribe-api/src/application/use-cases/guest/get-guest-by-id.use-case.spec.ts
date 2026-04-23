import { Test, TestingModule } from '@nestjs/testing';
import { GetGuestByIdUseCase } from './get-guest-by-id.use-case.js';
import { GUEST_REPOSITORY } from '../../../domain/repositories/guest.repository.interface.js';
import { EVENT_REPOSITORY } from '../../../domain/repositories/event.repository.interface.js';
import { ConfigService } from '@nestjs/config';
import { GuestStatus } from '../../../domain/enums/guest-status.enum.js';

describe('GetGuestByIdUseCase', () => {
  let useCase: GetGuestByIdUseCase;
  let guestRepository: any;
  let eventRepository: any;

  beforeEach(async () => {
    guestRepository = {
      findById: jest.fn(),
      findByCompanionId: jest.fn(),
    };
    eventRepository = {
      findById: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GetGuestByIdUseCase,
        { provide: GUEST_REPOSITORY, useValue: guestRepository },
        { provide: EVENT_REPOSITORY, useValue: eventRepository },
        {
          provide: ConfigService,
          useValue: { get: jest.fn().mockReturnValue('http://localhost:5173') },
        },
      ],
    }).compile();

    useCase = module.get<GetGuestByIdUseCase>(GetGuestByIdUseCase);
  });

  it('should return primary guest and companions with QR codes if confirmed', async () => {
    const primaryGuest = {
      id: 1,
      name: 'Primary',
      status: GuestStatus.CONFIRMED,
      eventId: 10,
      createdAt: new Date(),
    };
    const companion = {
      id: 2,
      name: 'Companion',
      status: GuestStatus.CONFIRMED,
      eventId: 10,
      responsibleId: 1,
      createdAt: new Date(),
    };

    guestRepository.findById.mockResolvedValue(primaryGuest);
    eventRepository.findById.mockResolvedValue({ id: 10, name: 'Event' });
    guestRepository.findByCompanionId.mockResolvedValue([companion]);

    const result = await useCase.execute({ id: 1 });

    expect(result.qrCode).toBeDefined();
    expect(result.companions[0].qrCode).toBeDefined();
    expect(result.companions[0].id).toBe(2);
  });
});
