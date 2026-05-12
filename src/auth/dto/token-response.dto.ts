import { IsJWT } from 'class-validator';

export class TokenResponseDto {
  @IsJWT()
  accessToken: string;
  @IsJWT()
  refreshToken: string;
}
