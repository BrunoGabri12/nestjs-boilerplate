import { IsEmail, IsString, IsStrongPassword, MaxLength, MinLength } from 'class-validator';

export class UserCreateDto {
  @IsString()
  @MinLength(3)
  @MaxLength(20)
  username: string;

  @IsEmail()
  email: string;

  @IsStrongPassword()
  password: string;
}
