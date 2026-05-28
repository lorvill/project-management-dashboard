import { IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateNoteDto {
  @IsOptional()
  @IsString()
  @MaxLength(20)
  title?: string;

  @IsOptional()
  content?: Record<string, any>;
}
