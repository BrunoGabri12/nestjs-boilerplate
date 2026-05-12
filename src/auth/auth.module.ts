import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from 'src/user/user.module';
import { AuthService } from './services/auth.service';
import { AuthController } from './controllers/auth.controller';
import { JwtModule } from 'src/jwt/jwt.module';
import { CommonModule } from 'src/common/common.module';
import { RefreshToken } from './entities/refresh-token.entity';
import { LocalStrategy } from 'src/jwt/strategy/local.strategy';

@Module({
  imports: [UserModule, JwtModule, CommonModule, TypeOrmModule.forFeature([RefreshToken])],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy],
})
export class AuthModule {}
