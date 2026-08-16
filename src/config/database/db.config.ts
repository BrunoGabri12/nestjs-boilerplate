//DEV FILE

import { registerAs } from '@nestjs/config';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

export default registerAs(
  'dbconfig.dev',
  (): PostgresConnectionOptions => ({
    type: 'postgres',
    host: String(process.env.DB_HOST || 'localhost'),
    port: parseInt(process.env.DB_PORT || '5432', 10),
    username: String(process.env.DB_USERNAME || 'postgres'),
    password: String(process.env.DB_PASSWORD || 'password'),
    database: String(process.env.DB_DATABASE || 'postgres'),
    synchronize: true,
    logging: false,
    entities: [__dirname + '/../../**/*.orm-entity{.ts,.js}'],
  }),
);
