import { randomUUID } from 'crypto';

export class RefreshTokenEntity {
  id: string;
  user_id: string;
  token_hash: string;
  expires_at: Date;

  constructor(user_id: string, token_hash: string, expires_at: Date, id?: string) {
    this.id = id || randomUUID();
    this.user_id = user_id;
    this.token_hash = token_hash;
    this.expires_at = expires_at;
  }
}
