import { Injectable } from '@nestjs/common';
import { CreateNoteDto } from './dto/create-note.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class NotesService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(userId: string, data: CreateNoteDto) {
    return this.prismaService.note.create({
      data: {
        title: data?.title,
        content: data?.content,
        userId,
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

  // update(id: string, updateNoteDto: UpdateNoteDto) {
  //   return `This action updates a #${id} note`;
  // }

  async remove(id: string, userId: string) {
    return this.prismaService.note.deleteMany({
      where: {
        id,
        userId,
      },
    });
  }
}
