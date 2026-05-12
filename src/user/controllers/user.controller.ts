import { Controller, UseGuards, Post, Body, Get, Param } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { UserCreateDto } from '../dto/user-create.dto';
import { UserResponseDto } from '../dto/user-response.dto';
import { JwtGuard } from 'src/jwt/guard/jwt.guard';
import { UserMapper } from '../mappers/user.mapper';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/')
  async create(@Body() createUser: UserCreateDto): Promise<UserResponseDto | null> {
    const user = await this.userService.create(createUser);
    return UserMapper.toResponseDto(user);
  }

  @UseGuards(JwtGuard)
  @Get('/:id')
  async getUserById(@Param('id') id: string): Promise<UserResponseDto | null> {
    const userDto = UserMapper.toResponseDto(await this.userService.findById(id));
    return userDto;
  }

  @UseGuards(JwtGuard)
  @Get('/')
  async getAllUsers(): Promise<UserResponseDto[]> {
    const users = await this.userService.findAll();
    return UserMapper.toResponseDtoList(users);
  }
}
