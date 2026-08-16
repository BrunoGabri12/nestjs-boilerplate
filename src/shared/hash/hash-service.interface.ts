import { Provider } from '@nestjs/common';
import { HashingService } from './hashing.service.imp';

export interface IHashService {
  hash(data: string): Promise<string>;
  compare(data: string, dataHashed: string): Promise<boolean>;
}

export const HASHING = Symbol('Hashing');

export const HASHING_PROVIDER: Provider = {
  provide: HASHING,
  useClass: HashingService,
};
