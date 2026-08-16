import { CreateUserResponseDto } from '../dto/create-user.response.dto';
import { UserEntity } from '../entity/user.entity';
import { UserOrmEntity } from '../entity/user.orm-entity';
import { UserRespository } from './user.repository.imp';

export interface IUserRepository {
  getUserByEmail(email: string): Promise<UserOrmEntity | null>;
  getAllUsers(): Promise<UserOrmEntity[]>;
  getUserById(id: number): Promise<UserOrmEntity | null>;
  createUser(createUserDto: UserEntity): Promise<CreateUserResponseDto>;
  userExistsByEmail(email: string): Promise<boolean>;
}

export const USER_REPOSITORY = Symbol('USER_REPOSITORY');

export const USER_PROVIDER = {
  provide: USER_REPOSITORY,
  useClass: UserRespository,
};
