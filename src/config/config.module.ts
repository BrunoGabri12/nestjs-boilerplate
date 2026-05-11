import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import appConfig from './app.config';
import jwtConfig from 'src/jwt/jwt.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig, jwtConfig],
      envFilePath: ['.env', '.env.development', '.env.production', '.env.test'],
    }),
  ],
  exports: [ConfigModule],
})
export class AppConfigModule {}
