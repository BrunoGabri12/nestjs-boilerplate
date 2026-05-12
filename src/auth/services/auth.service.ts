import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { HashingService } from 'src/common/hashing/hashing.service';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/services/user.service';
import { Repository } from 'typeorm';
import { TokenResponseDto } from '../dto/token-response.dto';
import { RefreshToken } from '../entities/refresh-token.entity';
import { ConfigService } from '@nestjs/config';
import { JwtPayloadDto } from 'src/jwt/dto/jwt-payload.dto';
import type { StringValue } from 'ms';
import { LoginRequestDto } from '../dto/login-request.dto';
import { TokenDto } from '../dto/token.dto';
import { randomUUID } from 'crypto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly hashingService: HashingService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    @InjectRepository(RefreshToken)
    private readonly refreshTokenRepository: Repository<RefreshToken>,
  ) {}

  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.userService.findByEmail(email);
    if (!user) return null;

    const isMatch = await this.hashingService.compare(password, user.passwordHash);
    if (!isMatch) return null;

    return user;
  }

  async login(loginRequest: LoginRequestDto): Promise<TokenResponseDto> {
    const userEntity = await this.validateUser(loginRequest.email, loginRequest.password);

    if (!userEntity) throw new UnauthorizedException('Problemas com email ou senha');

    const [accessToken, refreshToken] = await Promise.all([
      this.signAccessToken(userEntity),
      this.createRefreshToken(userEntity),
    ]);

    return { accessToken, refreshToken };
  }

  async refresh(refreshTokenDto: TokenDto): Promise<TokenResponseDto> {
    let payload: { sub: string; jti: string };
    try {
      payload = await this.jwtService.verifyAsync<{ sub: string; jti: string }>(refreshTokenDto.token, {
        secret: this.configService.getOrThrow<string>('jwt.jwtRefreshSecret'),
      });
    } catch {
      throw new UnauthorizedException('Refresh token inválido');
    }

    const tokenEntity = await this.refreshTokenRepository.findOne({
      where: { id: payload.jti, revoked: false },
      relations: ['user'],
    });

    if (!tokenEntity) throw new UnauthorizedException('Refresh token inválido');

    await this.refreshTokenRepository.update(tokenEntity.id, { revoked: true });

    const [accessToken, newRefreshToken] = await Promise.all([
      this.signAccessToken(tokenEntity.user),
      this.createRefreshToken(tokenEntity.user),
    ]);

    return { accessToken, refreshToken: newRefreshToken };
  }

  async logout(accessToken: string): Promise<void> {
    let payload: { sub: string; jti: string };
    try {
      payload = await this.jwtService.verifyAsync<{ sub: string; jti: string }>(accessToken, {
        secret: this.configService.getOrThrow<string>('jwt.jwtAccessSecret'),
      });
    } catch {
      throw new UnauthorizedException('Access token inválido');
    }

    await this.refreshTokenRepository.update({ user: { id: payload.sub }, revoked: false }, { revoked: true });
  }

  private signAccessToken(user: User): Promise<string> {
    const payload: JwtPayloadDto = { sub: user.id, email: user.email };
    return this.jwtService.signAsync(payload);
  }

  private async createRefreshToken(user: User): Promise<string> {
    const tokenId = randomUUID();
    const expiresIn = this.configService.getOrThrow<string>('jwt.jwtRefreshTtl') as StringValue;
    const jwtRefreshToken = await this.jwtService.signAsync(
      { sub: user.id, jti: tokenId },
      {
        secret: this.configService.getOrThrow<string>('jwt.jwtRefreshSecret'),
        expiresIn,
      },
    );

    const token = this.refreshTokenRepository.create({
      id: tokenId,
      refreshTokenHash: await this.hashingService.hash(jwtRefreshToken),
      user,
      revoked: false,
    });
    await this.refreshTokenRepository.save(token);

    return jwtRefreshToken;
  }
}
