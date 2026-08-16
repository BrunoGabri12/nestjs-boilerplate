import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserOrmEntity } from './entity/user.orm-entity';
import { USER_PROVIDER } from './repositories/user.repository';

@Module({
  controllers: [UserController],
  providers: [UserService, USER_PROVIDER],
  imports: [TypeOrmModule.forFeature([UserOrmEntity])],
})
export class UserModule {}
