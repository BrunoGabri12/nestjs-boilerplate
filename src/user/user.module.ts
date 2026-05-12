import { Module } from '@nestjs/common';
import { UserService } from './services/user.service';
import { CommonModule } from 'src/common/common.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserController } from './controllers/user.controller';

@Module({
  exports: [UserService],
  providers: [UserService],
  controllers: [UserController],
  imports: [CommonModule, TypeOrmModule.forFeature([User])],
})
export class UserModule {}
