import { Test, TestingModule } from '@nestjs/testing';
import { ConflictException } from '@nestjs/common';
import { CreateUserUseCase } from './create-user.use-case';
import { USER_REPOSITORY } from '../../../domain/repositories/user.repository.interface';
import { HASH_SERVICE } from '../../../domain/services/hash.service.interface';
import { USER_EVENT_REPOSITORY } from '../../../domain/repositories/user-event.repository.interface';
import { CreateUserDto } from '../../dtos/user/create-user.dto';
import { UserRole } from '../../../domain/enums/user-role.enum';

describe('CreateUserUseCase', () => {
  let useCase: CreateUserUseCase;
  let userRepository: any;
  let hashService: any;
  let userEventRepository: any;

  beforeEach(async () => {
    userRepository = {
      save: jest.fn(),
      existsByEmail: jest.fn(),
      existsByPhone: jest.fn(),
    };
    hashService = {
      hash: jest.fn(),
    };
    userEventRepository = {
      associate: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateUserUseCase,
        { provide: USER_REPOSITORY, useValue: userRepository },
        { provide: HASH_SERVICE, useValue: hashService },
        { provide: USER_EVENT_REPOSITORY, useValue: userEventRepository },
      ],
    }).compile();

    useCase = module.get<CreateUserUseCase>(CreateUserUseCase);
  });

  it('should create a user with active: true by default', async () => {
    const dto: CreateUserDto = {
      name: 'Test user',
      email: 'test@example.com',
      phone: '123456789',
      password: 'password123',
      role: UserRole.VIEW,
    };

    userRepository.existsByEmail.mockResolvedValue(false);
    userRepository.existsByPhone.mockResolvedValue(false);
    hashService.hash.mockResolvedValue('hashed_password');
    userRepository.save.mockImplementation((user) => Promise.resolve({ id: 1, ...user, createdAt: new Date() }));

    const result = await useCase.execute(dto);

    expect(userRepository.save).toHaveBeenCalledWith(expect.objectContaining({
      active: true,
      password: 'hashed_password',
    }));
    expect(result.id).toBeDefined();
  });

  it('should respect the active flag if provided', async () => {
    const dto: CreateUserDto = {
      name: 'Test user',
      email: 'test@example.com',
      phone: '123456789',
      password: 'password123',
      role: UserRole.VIEW,
      active: false,
    };

    userRepository.existsByEmail.mockResolvedValue(false);
    userRepository.existsByPhone.mockResolvedValue(false);
    hashService.hash.mockResolvedValue('hashed_password');
    userRepository.save.mockImplementation((user) => Promise.resolve({ id: 1, ...user, createdAt: new Date() }));

    const result = await useCase.execute(dto);

    expect(userRepository.save).toHaveBeenCalledWith(expect.objectContaining({
      active: false,
    }));
    expect(result.id).toBeDefined();
  });
});
