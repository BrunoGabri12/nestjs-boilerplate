import { UserCreateDto } from '../dto/user-create.dto';
import { UserResponseDto } from '../dto/user-response.dto';
import { User } from '../entities/user.entity';

export class UserMapper {
  static toEntity(dto: UserCreateDto, passwordHash: string): User {
    const user = new User();
    user.username = dto.username;
    user.email = dto.email;
    user.passwordHash = passwordHash;
    return user;
  }

  static toResponseDto(entity: User): UserResponseDto {
    const dto = new UserResponseDto();
    dto.id = entity.id;
    dto.username = entity.username;
    dto.email = entity.email;
    dto.createdAt = entity.createdAt;
    return dto;
  }

  static toResponseDtoList(entities: User[]): UserResponseDto[] {
    return entities.map((entity) => UserMapper.toResponseDto(entity));
  }
}
