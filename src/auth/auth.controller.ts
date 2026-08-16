import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AccessTokenResponseDto } from './dto/access-token.response.dto';
import { LoginRequestDto } from './dto/login.request.dto';
import { RefreshRequestDto } from './dto/refresh.request.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  login(@Body() loginRequestDto: LoginRequestDto): Promise<AccessTokenResponseDto> {
    return this.authService.login(loginRequestDto);
  }

  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  refresh(@Body() refreshRequestDto: RefreshRequestDto): Promise<AccessTokenResponseDto> {
    return this.authService.refresh(refreshRequestDto);
  }
}
