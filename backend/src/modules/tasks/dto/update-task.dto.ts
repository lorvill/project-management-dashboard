import { IsOptional, IsString, MaxLength } from 'class-validator';
import { TaskStatus } from '../../../../generated/prisma/enums';

export class UpdateTaskDto {
  @IsOptional()
  @IsString()
  @MaxLength(100)
  title?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  status?: TaskStatus;

  @IsOptional()
  @IsString()
  dueDate?: string;

  @IsOptional()
  @IsString()
  assigneeId?: string;
}
