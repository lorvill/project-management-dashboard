import { IsOptional, IsString, IsIn, IsEnum } from 'class-validator';
import { PaginationDto } from '../../pagination/pagination.dto';
import { TaskStatus } from '../../../../generated/prisma/enums';

export enum TaskSort {
  NEWEST = 'newest',
  OLDEST = 'oldest',
}

export class FilterAndSortDto extends PaginationDto {
  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsEnum(TaskStatus)
  status?: TaskStatus;

  @IsOptional()
  @IsEnum(TaskSort)
  sort?: TaskSort;
}
