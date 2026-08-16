import { UserResponse } from '../dto/user.response.dto';
import { UserEntity } from '../entity/user.entity';
import { UserOrmEntity } from '../entity/user.orm-entity';

export class UserMapper {
  static toResponse(userEntity: UserEntity): UserResponse {
    return {
      id: userEntity.id,
      email: userEntity.email,
    };
  }

  static fromOrmToEntity(userOrmEntity: UserOrmEntity): UserEntity {
    return new UserEntity(userOrmEntity.id, userOrmEntity.email, userOrmEntity.password_hash);
  }

  static fromOrmToResponse(userOrmEntity: UserOrmEntity): UserResponse {
    return {
      id: userOrmEntity.id,
      email: userOrmEntity.email,
    };
  }

  static toDomain(userResponse: UserResponse, password_hash: string): UserEntity {
    return new UserEntity(userResponse.id, userResponse.email, password_hash);
  }
}
