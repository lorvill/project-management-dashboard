import { IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString({ message: 'The field must be a string.' })
  @MinLength(2)
  email: string;

  @IsString({ message: 'The field must be a string.' })
  @MinLength(6)
  password: string;
}
