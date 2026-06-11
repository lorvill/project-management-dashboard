import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class ResetPasswordDto {
  token: string;

  @IsNotEmpty({ message: 'New password is required.' })
  @IsString()
  @MinLength(2, { message: 'Password is too short.' })
  newPassword: string;
}