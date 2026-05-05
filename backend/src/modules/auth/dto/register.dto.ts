import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Match } from '../../../libs/common/decorators/match.decorator';

export class RegisterDto {
  @IsEmail()
  @IsNotEmpty({message: 'Email is required.'})
  email: string

  @IsNotEmpty({message: 'Name is required.'})
  @IsString()
  @MinLength(2, { message: 'Name is too short.' })
  @MaxLength(15)
  name: string

  @IsNotEmpty({message: 'Password is required.'})
  @IsString()
  @MinLength(6, {message: 'Password must be at least 6 characters.'})
  password: string

  @IsNotEmpty()
  @IsString()
  @Match('password', {message: "Passwords don't match."})
  confirmPassword: string
}
