import { Body, Controller, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { TokenResponseDto } from '../dto/token-response.dto';
import { AuthService } from '../services/auth.service';
import { TokenDto } from '../dto/token.dto';
import { JwtGuard } from 'src/jwt/guard/jwt.guard';
import { LoginRequestDto } from '../dto/login-request.dto';
import { BearerToken } from '../decorators/bearer-token.decorator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() body: LoginRequestDto): Promise<TokenResponseDto> {
    return this.authService.login(body);
  }

  @Post('refresh')
  @UseGuards(JwtGuard)
  @HttpCode(HttpStatus.OK)
  async refresh(@Body() body: TokenDto): Promise<TokenResponseDto> {
    return this.authService.refresh(body);
  }

  @UseGuards(JwtGuard)
  @Post('logout')
  @HttpCode(HttpStatus.OK)
  async logout(@BearerToken() token: string): Promise<void> {
    return this.authService.logout(token);
  }
}
