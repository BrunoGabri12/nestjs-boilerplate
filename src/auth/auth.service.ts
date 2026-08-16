import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { StringValue } from 'ms';
import { IUserRepository, USER_REPOSITORY } from 'src/api/user/repositories/user.repository';
import { getConfigOrThrow } from 'src/shared/utils/config.util';
import { HASHING, IHashService } from 'src/shared/hash/hash-service.interface';
import { AccessTokenResponseDto } from './dto/access-token.response.dto';
import { LoginRequestDto } from './dto/login.request.dto';
import { RefreshRequestDto } from './dto/refresh.request.dto';
import { RefreshTokenEntity } from './entity/refresh-token.entity';
import { AUTH_REPOSITORY, IAuthRepository } from './repositories/auth.repository';
import { JwtPayloadDto } from 'src/shared/jwt/jwt-payload.dto';

@Injectable()
export class AuthService {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: IUserRepository,
    @Inject(AUTH_REPOSITORY)
    private readonly authRepository: IAuthRepository,
    @Inject(HASHING)
    private readonly hashingService: IHashService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async login(loginRequestDto: LoginRequestDto): Promise<AccessTokenResponseDto> {
    const user = await this.userRepository.getUserByEmail(loginRequestDto.email);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const passwordMatches = await this.hashingService.compare(loginRequestDto.password, user.password_hash);
    if (!passwordMatches) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload: JwtPayloadDto = { sub: user.id, email: user.email };

    const accessToken = await this.jwtService.signAsync(payload, {
      secret: getConfigOrThrow(this.configService, 'JWT_SECRET'),
      expiresIn: this.getExpiresIn('JWT_EXPIRES_IN', '1h'),
    });

    const refreshToken = await this.jwtService.signAsync(payload, {
      secret: getConfigOrThrow(this.configService, 'JWT_REFRESH_SECRET'),
      expiresIn: this.getExpiresIn('JWT_REFRESH_EXPIRES_IN', '7d'),
    });

    const refreshTokenHash = await this.hashingService.hash(refreshToken);
    const refreshExpiresIn = this.getExpiresIn('JWT_REFRESH_EXPIRES_IN', '7d');
    const expiresAt = this.parseExpiresIn(refreshExpiresIn);

    await this.authRepository.revokeRefreshTokenByUserId(user.id);
    await this.authRepository.createRefreshToken(new RefreshTokenEntity(user.id, refreshTokenHash, expiresAt));

    return { accessToken, refreshToken };
  }

  async refresh(refreshRequestDto: RefreshRequestDto): Promise<AccessTokenResponseDto> {
    let payload: JwtPayloadDto;

    try {
      payload = await this.jwtService.verifyAsync(refreshRequestDto.refreshToken, {
        secret: getConfigOrThrow(this.configService, 'JWT_REFRESH_SECRET'),
      });
    } catch {
      throw new UnauthorizedException('Invalid or expired refresh token');
    }

    const storedToken = await this.authRepository.findRefreshTokenByUserId(payload.sub);
    if (!storedToken) {
      throw new UnauthorizedException('Refresh token not found or revoked');
    }

    const tokenMatches = await this.hashingService.compare(refreshRequestDto.refreshToken, storedToken.token_hash);
    if (!tokenMatches) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    const newPayload: JwtPayloadDto = { sub: payload.sub, email: payload.email };

    const accessToken = await this.jwtService.signAsync(newPayload, {
      secret: getConfigOrThrow(this.configService, 'JWT_SECRET'),
      expiresIn: this.getExpiresIn('JWT_EXPIRES_IN', '1h'),
    });

    const newRefreshToken = await this.jwtService.signAsync(newPayload, {
      secret: getConfigOrThrow(this.configService, 'JWT_REFRESH_SECRET'),
      expiresIn: this.getExpiresIn('JWT_REFRESH_EXPIRES_IN', '7d'),
    });

    const refreshTokenHash = await this.hashingService.hash(newRefreshToken);
    const refreshExpiresIn = this.getExpiresIn('JWT_REFRESH_EXPIRES_IN', '7d');
    const expiresAt = this.parseExpiresIn(refreshExpiresIn);

    await this.authRepository.revokeRefreshTokenByUserId(payload.sub);
    await this.authRepository.createRefreshToken(new RefreshTokenEntity(payload.sub, refreshTokenHash, expiresAt));

    return { accessToken, refreshToken: newRefreshToken };
  }

  private getExpiresIn(key: string, fallback: StringValue): StringValue {
    const value = this.configService.get<string>(key);
    return (value ?? fallback) as StringValue;
  }

  private parseExpiresIn(expiresIn: StringValue): Date {
    const unit = expiresIn.slice(-1);
    const value = parseInt(expiresIn.slice(0, -1), 10);
    const date = new Date();
    if (unit === 'd') date.setDate(date.getDate() + value);
    else if (unit === 'h') date.setHours(date.getHours() + value);
    else if (unit === 'm') date.setMinutes(date.getMinutes() + value);
    return date;
  }
}
