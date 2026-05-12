import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class HashingService {
  async hash(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
  }

  compare(password: string, passwordHashed: string): Promise<boolean> {
    return bcrypt.compare(password, passwordHashed);
  }
}
