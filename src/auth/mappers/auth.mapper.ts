import { User } from 'src/user/entities/user.entity';
import { TokenResponseDto } from '../dto/token-response.dto';
import { RefreshToken } from '../entities/refresh-token.entity';

export class AuthMapper {
  static toRefreshToken(id: string, refreshTokenHash: string, user: User): RefreshToken {
    const token = new RefreshToken();
    token.id = id;
    token.refreshTokenHash = refreshTokenHash;
    token.user = user;
    token.revoked = false;
    return token;
  }

  static toTokenResponseDto(accessToken: string, refreshToken: string): TokenResponseDto {
    const dto = new TokenResponseDto();
    dto.accessToken = accessToken;
    dto.refreshToken = refreshToken;
    return dto;
  }
}
