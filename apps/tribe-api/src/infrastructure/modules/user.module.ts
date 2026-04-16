import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserTypeOrmEntity } from '../persistence/entities/user.typeorm-entity.js';
import { UserTypeOrmRepository } from '../persistence/repositories/user.typeorm-repository.js';
import { USER_REPOSITORY } from '../../domain/repositories/user.repository.interface.js';
import { CreateUserUseCase } from '../../application/use-cases/user/create-user.use-case.js';
import { FindUsersUseCase } from '../../application/use-cases/user/find-users.use-case.js';
import { FindUserByIdUseCase } from '../../application/use-cases/user/find-user-by-id.use-case.js';
import { UpdateUserUseCase } from '../../application/use-cases/user/update-user.use-case.js';
import { DeleteUserUseCase } from '../../application/use-cases/user/delete-user.use-case.js';
import { UserController } from '../../presentation/controllers/user.controller.js';
import { AuthModule } from './auth.module.js';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserTypeOrmEntity]),
    forwardRef(() => AuthModule),
  ],
  controllers: [UserController],
  providers: [
    { provide: USER_REPOSITORY, useClass: UserTypeOrmRepository },
    CreateUserUseCase,
    FindUsersUseCase,
    FindUserByIdUseCase,
    UpdateUserUseCase,
    DeleteUserUseCase,
  ],
  exports: [USER_REPOSITORY],
})
export class UserModule {}
