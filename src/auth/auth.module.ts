import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserOrmEntity } from 'src/api/user/entity/user.orm-entity';
import { USER_PROVIDER } from 'src/api/user/repositories/user.repository';
import jwtConfig from 'src/config/jwt/jwt.config';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { RefreshTokenOrmEntity } from './entity/refresh-token.orm-entity';
import { AUTH_PROVIDER } from './repositories/auth.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([RefreshTokenOrmEntity, UserOrmEntity]),
    JwtModule.register({}),
    ConfigModule.forFeature(jwtConfig),
  ],
  controllers: [AuthController],
  providers: [AuthService, AUTH_PROVIDER, USER_PROVIDER],
})
export class AuthModule {}
