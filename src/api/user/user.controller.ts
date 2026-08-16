import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserRequestDto } from './dto/create-user.request.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserRequestDto) {
    return this.userService.create(createUserDto);
  }

  @Get('all')
  getAllUsers() {
    return this.userService.getAllUsers();
  }
}
