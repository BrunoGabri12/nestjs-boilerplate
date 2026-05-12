import { BadRequestException, Injectable } from '@nestjs/common';
import { User } from '../entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm/repository/Repository';
import { HashingService } from 'src/common/hashing/hashing.service';
import { UserCreateDto } from '../dto/user-create.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly hashingService: HashingService,
  ) {}

  async findById(_id: string): Promise<User | null> {
    const user = await this.userRepository.findOne({ where: { id: _id } });
    return user || null;
  }

  async findByEmail(_email: string): Promise<User | null> {
    const user = await this.userRepository.findOne({ where: { email: _email } });
    return user || null;
  }

  async create(userCreateDto: UserCreateDto): Promise<User> {
    if (await this.findByEmail(userCreateDto.email)) {
      throw new BadRequestException('Não foi possível criar o usuário. Tente novamente');
    }

    const passwordHash = await this.hashingService.hash(userCreateDto.password);
    const user = this.userRepository.create({
      username: userCreateDto.username,
      email: userCreateDto.email,
      passwordHash,
    });
    return this.userRepository.save(user);
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async userExists(email: string): Promise<boolean> {
    return await this.userRepository.exists({ where: { email } });
  }
}
