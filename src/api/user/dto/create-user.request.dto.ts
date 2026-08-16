import { IsEmail, IsString, IsStrongPassword, MinLength } from 'class-validator';

export class CreateUserRequestDto {
  @IsString()
  @MinLength(3)
  username: string;

  @IsEmail()
  email: string;

  @IsStrongPassword()
  password: string;
}
