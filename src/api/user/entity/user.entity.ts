import { randomUUID } from 'crypto';

export class UserEntity {
  id: string;
  email: string;
  password_hash: string;

  constructor(email: string, password_hash: string, id?: string) {
    this.id = id || randomUUID();
    this.email = email;
    this.password_hash = password_hash;
  }
}
