import * as Joi from 'joi';
import { EnvironmentVariables } from './env.interface';

const configSchema = Joi.object<EnvironmentVariables>({
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
}).required();

export default () => {
  const config = {
    NODE_ENV: process.env.NODE_ENV || 'development',
    DB_TYPE: process.env.DB_TYPE,
    DB_HOST: process.env.DB_HOST || 'localhost',
    DB_PORT: parseInt(process.env.DB_PORT as string, 10) || 5432,
    DB_USERNAME: process.env.DB_USERNAME,
    DB_PASSWORD: process.env.DB_PASSWORD,
    DB_DATABASE: process.env.DB_DATABASE,
    JWT_SECRET: process.env.JWT_SECRET,
    JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN,
    JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET,
    JWT_REFRESH_EXPIRES_IN: process.env.JWT_REFRESH_EXPIRES_IN,
  };

  const { error, value } = configSchema.validate(config, { abortEarly: false });

  if (error) {
    throw new Error(`Config validation error: ${error.message}`);
  }

  return value;
};
