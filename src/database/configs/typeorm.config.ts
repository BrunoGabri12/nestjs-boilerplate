import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

/**
 * Fábrica de configuração para o TypeORM.
 * Lê as variáveis de ambiente via ConfigService.
 *
 * Para adicionar suporte a outro banco (ex: PostgreSQL), basta alterar
 * DB_TYPE no arquivo .env — desde que o driver correspondente esteja instalado.
 */
export const typeormConfig = (config: ConfigService): TypeOrmModuleOptions => ({
  type: config.get<'mysql' | 'postgres' | 'sqlite' | 'mariadb'>('DB_TYPE', 'postgres'),
  host: config.get<string>('DB_HOST'),
  port: config.get<number>('DB_PORT'),
  username: config.get<string>('DB_USERNAME'),
  password: config.get<string>('DB_PASSWORD'),
  database: config.get<string>('DB_DATABASE'),
  entities: [__dirname + '/../../**/*.entity{.ts,.js}'],
  synchronize: config.get<string>('NODE_ENV') !== 'production', //TODO: user migrations ao invés de synchronize
  autoLoadEntities: true,
  logging: config.get<string>('NODE_ENV') === 'development',
});
