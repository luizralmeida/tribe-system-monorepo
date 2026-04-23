import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { CreateEventUseCase } from './create-event.use-case';
import { EVENT_REPOSITORY } from '../../../domain/repositories/event.repository.interface';
import { ADDRESS_REPOSITORY } from '../../../domain/repositories/address.repository.interface';
import { CreateEventDto } from '../../dtos/event/create-event.dto';
import { BrazilianState } from '../../../domain/enums/brazilian-state.enum';
import { Address } from '../../../domain/entities/address.entity';

describe('CreateEventUseCase', () => {
  let useCase: CreateEventUseCase;
  let eventRepository: any;
  let addressRepository: any;

  beforeEach(async () => {
    eventRepository = {
      save: jest.fn(),
    };
    addressRepository = {
      findById: jest.fn(),
      save: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateEventUseCase,
        { provide: EVENT_REPOSITORY, useValue: eventRepository },
        { provide: ADDRESS_REPOSITORY, useValue: addressRepository },
      ],
    }).compile();

    useCase = module.get<CreateEventUseCase>(CreateEventUseCase);
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });

  it('should create an event with an existing addressId', async () => {
    const dto: CreateEventDto = {
      name: 'Test Event',
      date: '2026-05-01T10:00:00Z',
      addressId: 1,
    };

    addressRepository.findById.mockResolvedValue({ id: 1 } as Address);
    eventRepository.save.mockResolvedValue({
      id: 10,
      name: dto.name,
      addressId: 1,
      date: new Date(dto.date),
      createdAt: new Date(),
    } as any);

    const result = await useCase.execute(dto);

    expect(addressRepository.findById).toHaveBeenCalledWith(1);
    expect(eventRepository.save).toHaveBeenCalled();
    expect(result).toBeDefined();
    expect(result.addressId).toBe(1);
  });

  it('should create an event and a new address', async () => {
    const dto: CreateEventDto = {
      name: 'Test Event',
      date: '2026-05-01T10:00:00Z',
      address: {
        street: 'Rua Teste',
        neighborhood: 'Bairro Teste',
        number: '123',
        city: 'São Paulo',
        state: BrazilianState.SP,
      },
    };

    addressRepository.save.mockResolvedValue({ id: 2 } as Address);
    eventRepository.save.mockResolvedValue({
      id: 10,
      name: dto.name,
      addressId: 2,
      date: new Date(dto.date),
      createdAt: new Date(),
    } as any);

    const result = await useCase.execute(dto);

    expect(addressRepository.save).toHaveBeenCalledWith({
      ...dto.address,
      name: null,
      complement: '',
      country: 'Brasil',
    });
    expect(eventRepository.save).toHaveBeenCalledWith(expect.objectContaining({ addressId: 2 }));
    expect(result).toBeDefined();
    expect(result.addressId).toBe(2);
  });

  it('should throw BadRequestException if neither address nor addressId is provided', async () => {
    const dto: CreateEventDto = {
      name: 'Test Event',
      date: '2026-05-01T10:00:00Z',
    };

    await expect(useCase.execute(dto)).rejects.toThrow(BadRequestException);
  });

  it('should throw NotFoundException if addressId is provided but address not found', async () => {
    const dto: CreateEventDto = {
      name: 'Test Event',
      date: '2026-05-01T10:00:00Z',
      addressId: 999,
    };

    addressRepository.findById.mockResolvedValue(null);

    await expect(useCase.execute(dto)).rejects.toThrow(NotFoundException);
  });
});
