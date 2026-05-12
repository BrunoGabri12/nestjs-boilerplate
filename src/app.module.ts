import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { DatabaseModule } from './database/database.module';
import { CommonModule } from './common/common.module';
import { JwtModule } from './jwt/jwt.module';
import jwtConfig from './jwt/jwt.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [jwtConfig],
      envFilePath: ['.env', '.env.development', '.env.production', '.env.test', '.env.example'],
      validationSchema: Joi.object({
        NODE_ENV: Joi.string().valid('development', 'production', 'test').default('development'),
        PORT: Joi.number().integer().min(1).max(65535).default(3000),
        DB_TYPE: Joi.string().valid('mysql', 'postgres', 'sqlite', 'mariadb').required(),
        DB_HOST: Joi.string().hostname().default('localhost'),
        DB_PORT: Joi.number().integer().min(1).max(65535).default(5432),
        DB_USERNAME: Joi.string().min(3).required(),
        DB_PASSWORD: Joi.string().min(6).required(),
        DB_DATABASE: Joi.string().min(3).required(),
        JWT_SECRET: Joi.string().min(32).required(),
        JWT_EXPIRES_IN: Joi.string().default('1h'),
        JWT_REFRESH_SECRET: Joi.string().min(32).required(),
        JWT_REFRESH_EXPIRES_IN: Joi.string().default('7d'),
      }),
      validationOptions: { abortEarly: false },
    }),
    AuthModule,
    UserModule,
    DatabaseModule,
    CommonModule,
    JwtModule,
  ],
})
export class AppModule {}
