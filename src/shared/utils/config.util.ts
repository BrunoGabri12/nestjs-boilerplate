import { ConfigService } from '@nestjs/config';

export function getConfigOrThrow(configService: ConfigService, key: string): string {
  const value = configService.get<string>(key);
  if (!value) {
    throw new Error(`Missing required config: ${key}`);
  }

  return value;
}
