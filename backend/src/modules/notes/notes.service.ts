import { Injectable } from '@nestjs/common';
import { CreateNoteDto } from './dto/create-note.dto';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateNoteDto } from './dto/update-note.dto';
import { Prisma } from '../../../generated/prisma/client';
import { FilterAndSortDto } from './dto/filter-and-sort.dto';
import { PaginationService } from '../pagination/pagination.service';

@Injectable()
export class NotesService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly paginationService: PaginationService,
  ) {}

  async create(userId: string, data: CreateNoteDto) {
    return this.prismaService.note.create({
      data: {
        userId,
        title: data?.title ? data.title : undefined,
        content: data?.content ?? Prisma.JsonNull,
      },
    });
  }

  async findAll(userId: string, query: FilterAndSortDto) {
    const { search, active, sort } = query;
    const where: Prisma.NoteWhereInput = {
      userId,
    };

    if (search) {
      where.OR = [
        {
          title: {
            contains: search,
            mode: 'insensitive',
          },
        },
      ];
    }

    if (active === 'pinned') {
      where.isPinned = true;
    }

    const { skip, take } = this.paginationService.getParams(query);

    /*
      SELECT *
      FROM notes
      WHERE user_id = ?
        AND title ILIKE '% ?? %'
        AND is_pinned = true
      ORDER BY created_at DESC
      LIMIT 12
      OFFSET 12;
     */

    const [items, total] = await Promise.all([
      this.prismaService.note.findMany({
        where,
        orderBy: { createdAt: sort === 'oldest' ? 'asc' : 'desc' },
        skip,
        take,
      }),
      this.prismaService.note.count({ where }),
    ]);
    return this.paginationService.paginate(items, total, query);
  }

  async findOne(id: string, userId: string) {
    return this.prismaService.note.findFirst({
      where: {
        id,
        userId,
      },
    });
  }

  update(id: string, data: UpdateNoteDto) {
    return this.prismaService.note.update({
      where: { id },
      data: {
        title: data.title,
        content: data.content ?? Prisma.JsonNull,
      },
    });
  }

  async remove(id: string, userId: string) {
    return this.prismaService.note.deleteMany({
      where: {
        id,
        userId,
      },
    });
  }
}
