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
} from '@nestjs/common';
import { Roles } from '../../infrastructure/auth/decorators/roles.decorator.js';
import { UserRole } from '../../domain/enums/user-role.enum.js';
import { CreateUserUseCase } from '../../application/use-cases/user/create-user.use-case.js';
import { FindUsersUseCase } from '../../application/use-cases/user/find-users.use-case.js';
import { FindUserByIdUseCase } from '../../application/use-cases/user/find-user-by-id.use-case.js';
import { UpdateUserUseCase } from '../../application/use-cases/user/update-user.use-case.js';
import { DeleteUserUseCase } from '../../application/use-cases/user/delete-user.use-case.js';
import { CreateUserDto } from '../../application/dtos/user/create-user.dto.js';
import { UpdateUserDto } from '../../application/dtos/user/update-user.dto.js';
import { UserResponseDto } from '../../application/dtos/user/user-response.dto.js';
import { PaginationQueryDto, PaginatedResponseDto } from '../../application/dtos/pagination.dto.js';

@Controller('users')
export class UserController {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly findUsersUseCase: FindUsersUseCase,
    private readonly findUserByIdUseCase: FindUserByIdUseCase,
    private readonly updateUserUseCase: UpdateUserUseCase,
    private readonly deleteUserUseCase: DeleteUserUseCase,
  ) {}

  @Post()
  @Roles(UserRole.SUPER)
  async create(@Body() dto: CreateUserDto): Promise<UserResponseDto> {
    return this.createUserUseCase.execute(dto);
  }

  @Get()
  @Roles(UserRole.SUPER)
  async findAll(
    @Query() query: PaginationQueryDto,
  ): Promise<PaginatedResponseDto<UserResponseDto>> {
    return this.findUsersUseCase.execute(query);
  }

  @Get(':id')
  @Roles(UserRole.SUPER)
  async findById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<UserResponseDto> {
    return this.findUserByIdUseCase.execute(id);
  }

  @Put(':id')
  @Roles(UserRole.SUPER)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateUserDto,
  ): Promise<UserResponseDto> {
    return this.updateUserUseCase.execute({ id, data: dto });
  }

  @Delete(':id')
  @Roles(UserRole.SUPER)
  async delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.deleteUserUseCase.execute(id);
  }
}
