import { IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString({ message: 'поле должно быть строкой' })
  @MinLength(2)
  email: string;

  @IsString({ message: 'поле должно быть строкой' })
  @MinLength(2)
  password: string;
}