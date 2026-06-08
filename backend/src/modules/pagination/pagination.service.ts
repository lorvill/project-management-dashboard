import { Injectable } from '@nestjs/common';
import { PaginationDto } from './pagination.dto';

@Injectable()
export class PaginationService {
  getParams(dto: PaginationDto): { skip: number; take: number } {
    const { page, limit } = dto;
    return {
      skip: (page - 1) * limit,
      take: limit,
    };
  }

  paginate<T>(items: T[], total: number, dto: PaginationDto) {
    const { page, limit } = dto;

    return {
      items,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
        hasNextPage: page * limit < total,
        hasPreviousPage: page > 1,
      },
    };
  }
}
