import { Injectable } from '@nestjs/common';
import { CreateNoteDto } from './dto/create-note.dto';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateNoteDto } from './dto/update-note.dto';
import { Prisma } from '../../../generated/prisma/client';

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

  async findAll(userId: string) {
    return this.prismaService.note.findMany({
      where: {
        userId,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
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
