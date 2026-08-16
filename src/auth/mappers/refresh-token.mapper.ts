import { RefreshTokenEntity } from '../entity/refresh-token.entity';
import { RefreshTokenOrmEntity } from '../entity/refresh-token.orm-entity';

export class RefreshTokenMapper {
  static fromOrmToEntity(ormEntity: RefreshTokenOrmEntity): RefreshTokenEntity {
    return new RefreshTokenEntity(ormEntity.user_id, ormEntity.token_hash, ormEntity.expires_at, ormEntity.id);
  }

  static toOrm(entity: RefreshTokenEntity): Partial<RefreshTokenOrmEntity> {
    return {
      id: entity.id,
      user_id: entity.user_id,
      token_hash: entity.token_hash,
      expires_at: entity.expires_at,
    };
  }
    
}
