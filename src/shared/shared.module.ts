import { Global, Module } from '@nestjs/common';
import { HASHING_PROVIDER } from './hash/hash-service.interface';

@Global()
@Module({
  providers: [HASHING_PROVIDER],
  exports: [HASHING_PROVIDER],
})
export class SharedModule {}
