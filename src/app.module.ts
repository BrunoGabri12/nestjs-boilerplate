import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { DatabaseModule } from './database/database.module';
import { CommonModule } from './common/common.module';
import { JwtModule } from './jwt/jwt.module';
import { AppConfigModule } from './config/config.module';

@Module({
  imports: [AppConfigModule, AuthModule, UserModule, DatabaseModule, CommonModule, JwtModule],
})
export class AppModule {}
