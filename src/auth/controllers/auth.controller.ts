import { Body, Controller, HttpCode, HttpStatus, Post, Req, UseGuards } from '@nestjs/common';
import { TokenResponseDto } from '../dto/token-response.dto';
import { AuthService } from '../services/auth.service';
import { RefreshRequestDto } from '../dto/refresh-request.dto';
import { LocalGuard } from 'src/jwt/guard/local.guard';
import { JwtGuard } from 'src/jwt/guard/jwt.guard';
import { LoginRequestDto } from '../dto/login-request.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() body: LoginRequestDto): Promise<TokenResponseDto> {
    return this.authService.login(body);
  }

  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  async refresh(@Body() body: RefreshRequestDto): Promise<TokenResponseDto> {
    return this.authService.refresh(body);
  }

  @UseGuards(JwtGuard)
  @Post('logout')
  @HttpCode(HttpStatus.OK)
  async logout(@Body() body: any): Promise<void> {
    return this.authService.logout(body);
  }
}
