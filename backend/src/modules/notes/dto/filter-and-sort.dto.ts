import { IsOptional, IsString, IsIn } from 'class-validator';

export class FilterAndSortDto {
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
