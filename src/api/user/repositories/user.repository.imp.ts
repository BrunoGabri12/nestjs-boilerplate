import { InjectRepository } from '@nestjs/typeorm';
import { IUserRepository } from './user.repository';
import { Repository } from 'typeorm/repository/Repository';
import { UserOrmEntity } from '../entity/user.orm-entity';
import { UserEntity } from '../entity/user.entity';
import { CreateUserResponseDto } from '../dto/create-user.response.dto';

export class UserRespository implements IUserRepository {
  constructor(
    @InjectRepository(UserOrmEntity)
    private readonly userRepository: Repository<UserOrmEntity>,
  ) {}

  async createUser(user: UserEntity): Promise<CreateUserResponseDto> {
    await this.userRepository
      .createQueryBuilder('user')
      .insert()
      .into(UserOrmEntity)
      .values({ id: user.id, email: user.email, password_hash: user.password_hash })
      .execute();
    return { id: user.id };
  }

  userExistsByEmail(email: string): Promise<boolean> {
    return this.userRepository.exists({ where: { email } });
  }

  getUserByEmail(email: string): Promise<UserOrmEntity | null> {
    return this.userRepository
      .createQueryBuilder('user')
      .where('user.email = :email', { email })
      .getOne();
  }

  getAllUsers(): Promise<UserOrmEntity[]> {
    const users = this.userRepository.createQueryBuilder('user').getMany();
    return users;
  }

  getUserById(id: number): Promise<UserOrmEntity | null> {
    throw new Error('Method not implemented.');
  }
}
