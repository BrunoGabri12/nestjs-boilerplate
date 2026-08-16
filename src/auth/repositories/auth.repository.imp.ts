import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RefreshTokenEntity } from '../entity/refresh-token.entity';
import { RefreshTokenOrmEntity } from '../entity/refresh-token.orm-entity';
import { RefreshTokenMapper } from '../mappers/refresh-token.mapper';
import { IAuthRepository } from './auth.repository';

export class AuthRepository implements IAuthRepository {
  constructor(
    @InjectRepository(RefreshTokenOrmEntity)
    private readonly refreshTokenRepository: Repository<RefreshTokenOrmEntity>,
  ) {}

  async createRefreshToken(entity: RefreshTokenEntity): Promise<void> {
    await this.refreshTokenRepository
      .createQueryBuilder()
      .insert()
      .into(RefreshTokenOrmEntity)
      .values(RefreshTokenMapper.toOrm(entity))
      .execute();
  }

  async findRefreshTokenByUserId(userId: string): Promise<RefreshTokenOrmEntity | null> {
    const ormEntity = await this.refreshTokenRepository
      .createQueryBuilder('refresh_token')
      .where('refresh_token.user_id = :userId', { userId })
      .andWhere('refresh_token.expires_at > NOW()')
      .andWhere('refresh_token.deleted_at IS NULL')
      .getOne();

    return ormEntity ? ormEntity : null;
  }

  async revokeRefreshTokenByUserId(userId: string): Promise<void> {
    await this.refreshTokenRepository
      .createQueryBuilder()
      .softDelete()
      .from(RefreshTokenOrmEntity)
      .where('user_id = :userId', { userId })
      .execute();
  }
}
