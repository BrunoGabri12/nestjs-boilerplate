import { BaseOrmEntity } from 'src/shared/database/base-orm.entity';
import { Column, Entity } from 'typeorm';

@Entity('user')
export class UserOrmEntity extends BaseOrmEntity {
  @Column('varchar', { length: 255, unique: true })
  email: string;

  @Column('varchar', { length: 255, nullable: false })
  password_hash: string;
}
