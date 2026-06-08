import { IsOptional, IsString, IsIn } from 'class-validator';
import { PaginationDto } from '../../pagination/pagination.dto';

export class FilterAndSortDto extends PaginationDto {
  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsIn(['all', 'pinned'])
  active?: 'all' | 'pinned';

  @IsOptional()
  @IsIn(['newest', 'oldest'])
  sort?: 'newest' | 'oldest';
}
