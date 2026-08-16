import { Provider } from '@nestjs/common';
import { RefreshTokenEntity } from '../entity/refresh-token.entity';
import { RefreshTokenOrmEntity } from '../entity/refresh-token.orm-entity';
import { AuthRepository } from './auth.repository.imp';

export interface IAuthRepository {
  createRefreshToken(entity: RefreshTokenEntity): Promise<void>;
  findRefreshTokenByUserId(userId: string): Promise<RefreshTokenOrmEntity | null>;
  revokeRefreshTokenByUserId(userId: string): Promise<void>;
}

export const AUTH_REPOSITORY = Symbol('AUTH_REPOSITORY');

export const AUTH_PROVIDER: Provider = {
  provide: AUTH_REPOSITORY,
  useClass: AuthRepository,
};
