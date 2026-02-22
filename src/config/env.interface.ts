export interface EnvironmentVariables {
  NODE_ENV: 'development' | 'production' | 'test';
  PORT: number;

  DB_TYPE: 'mysql' | 'postgres' | 'sqlite' | 'mariadb';
  DB_HOST: string;
  DB_PORT: number;
  DB_USERNAME: string;
  DB_PASSWORD: string;
  DB_DATABASE: string;

  JWT_SECRET: string;
  JWT_EXPIRES_IN: string;

  JWT_REFRESH_SECRET: string;
  JWT_REFRESH_EXPIRES_IN: string;
}
