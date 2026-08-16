import { BaseOrmEntity } from 'src/shared/database/base-orm.entity';
import { Column, Entity } from 'typeorm';

@Entity('refresh_token')
export class RefreshTokenOrmEntity extends BaseOrmEntity {
  @Column('uuid')
  user_id: string;

  @Column('varchar', { length: 512, nullable: false })
  token_hash: string;

  @Column('timestamp with time zone')
  expires_at: Date;
}
