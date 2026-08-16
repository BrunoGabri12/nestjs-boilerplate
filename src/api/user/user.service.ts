import { Inject, Injectable } from '@nestjs/common';
import { CreateUserRequestDto } from './dto/create-user.request.dto';
import { IUserRepository, USER_REPOSITORY } from './repositories/user.repository';
import { HASHING, IHashService } from 'src/shared/hash/hash-service.interface';
import { UserEntity } from './entity/user.entity';
import { CreateUserResponseDto } from './dto/create-user.response.dto';
import { UserOrmEntity } from './entity/user.orm-entity';
import { UserMapper } from './mappers/user.mapper';

@Injectable()
export class UserService {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: IUserRepository,
    @Inject(HASHING)
    private readonly hashingService: IHashService,
  ) {}

  async create(createUserDto: CreateUserRequestDto): Promise<CreateUserResponseDto> {
    const passwordHashed = await this.hashingService.hash(createUserDto.password);
    const userEntity = new UserEntity(createUserDto.email, passwordHashed);

    const userHasAlreadyExists = await this.userRepository.userExistsByEmail(createUserDto.email);

    if (userHasAlreadyExists) {
      throw new Error('User with this email already exists');
    }

    return await this.userRepository.createUser(userEntity);
  }

  async getAllUsers() {
    const users: UserOrmEntity[] = await this.userRepository.getAllUsers();
    const mappedUsers = users.map((user) => UserMapper.fromOrmToResponse(user));
    return mappedUsers;
  }
}
