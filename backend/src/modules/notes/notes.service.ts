import { Injectable } from '@nestjs/common';
import { CreateNoteDto } from './dto/create-note.dto';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateNoteDto } from './dto/update-note.dto';
import { Prisma } from '../../../generated/prisma/client';
import { FilterAndSortDto } from './dto/filter-and-sort.dto';

@Injectable()
export class NotesService {
  constructor(private readonly prismaService: PrismaService) {}

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
    const { search, active, sort, page = 1, limit = 12 } = query;
    const where = {
      userId,
      ...(search && {
        OR: [{ title: { contains: search, mode: 'insensitive' as const } }],
      }),
      ...(active === 'pinned' && { isPinned: true })
    };

    const [items, total] = await this.prismaService.$transaction([
      this.prismaService.note.findMany({
        where,
        orderBy: { createdAt: sort === 'oldest' ? 'asc' : 'desc' },
        skip: (page - 1) * limit,
        take: limit,
      }),
      
      this.prismaService.note.count({ where }),
    ]);
    const totalPages = Math.ceil(total / limit);

    return {
      items,
      meta: {
        total,
        page,
        limit,
        totalPages,
        hasNextPage: page * limit < total,
        hasPreviousPage: page > 1,
      },
    };
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
