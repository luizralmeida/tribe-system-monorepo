import { Test, TestingModule } from '@nestjs/testing';
import { CreateGuestUseCase } from './create-guest.use-case.js';
import { GUEST_REPOSITORY } from '../../../domain/repositories/guest.repository.interface.js';
import { GuestStatus } from '../../../domain/enums/guest-status.enum.js';
import { CreateGuestDto } from '../../dtos/guest/create-guest.dto.js';

describe('CreateGuestUseCase', () => {
  let useCase: CreateGuestUseCase;
  let repository: any;

  beforeEach(async () => {
    repository = {
      save: jest.fn(),
      saveBulk: jest.fn(),
      findById: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateGuestUseCase,
        { provide: GUEST_REPOSITORY, useValue: repository },
      ],
    }).compile();

    useCase = module.get<CreateGuestUseCase>(CreateGuestUseCase);
  });

  it('should create a primary guest and their companions', async () => {
    const input = {
      eventId: 1,
      data: {
        name: 'Primary Guest',
        phone: '123456789',
        email: 'primary@example.com',
        isChild: false,
        companions: [
          {
            name: 'Companion 1',
            isChild: true,
            age: 10,
          },
        ],
      } as any as CreateGuestDto,
    };

    repository.save.mockResolvedValue({
      id: 1,
      ...input.data,
      eventId: 1,
      responsibleId: 0,
    });

    await useCase.execute(input);

    expect(repository.save).toHaveBeenCalled();
    expect(repository.saveBulk).toHaveBeenCalledWith([
      expect.objectContaining({
        name: 'Companion 1',
        responsibleId: 1,
        isChild: true,
      }),
    ]);
  });
});
