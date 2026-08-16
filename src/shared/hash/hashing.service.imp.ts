import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { IHashService } from './hash-service.interface';

@Injectable()
export class HashingService implements IHashService {
  async hash(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
  }

  compare(password: string, passwordHashed: string): Promise<boolean> {
    return bcrypt.compare(password, passwordHashed);
  }
}
