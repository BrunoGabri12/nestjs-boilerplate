import { Controller, UseGuards, Post, Body, Get, Param } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { UserCreateDto } from '../dto/user-create.dto';
import { UserResponseDto } from '../dto/user-response.dto';
import { JwtGuard } from 'src/jwt/guard/jwt.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/')
  async create(@Body() createUser: UserCreateDto): Promise<UserResponseDto | null> {
    return await this.userService.create(createUser);
  }

  @UseGuards(JwtGuard)
  @Get('/:id')
  async getUserById(@Param('id') id: string): Promise<UserResponseDto | null> {
    return await this.userService.findById(id);
  }

  @UseGuards(JwtGuard)
  @Get('/')
  async getAllUsers(): Promise<UserResponseDto[]> {
    return await this.userService.findAll();
  }
}
