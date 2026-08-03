import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Task } from '../../../generated/prisma/client';
import { UpdateTaskDto } from './dto/update-task.dto';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskStatus } from '../../../generated/prisma/client';
import { TaskScalarFieldEnum } from '../../../generated/prisma/internal/prismaNamespace';
import { TaskGroupBy, TasksGroupedByStatus } from './dto/view.dto';

@Injectable()
export class TasksService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(userId: string, task: CreateTaskDto) {
    return this.prismaService.task.create({
      data: {
        ...task,
        createdById: userId,
      },
    });
  }

  async getAll(userId: string): Promise<Task[]> {
    return this.prismaService.task.findMany({
      where: {
        OR: [{ createdById: userId }, { assigneeId: userId }],
      },
      orderBy: {
        createdAt: 'asc',
      },
    });
  }

  async update(id: string, data: UpdateTaskDto) {
    return this.prismaService.task.update({
      where: { id },
      data,
    });
  }

  async delete(id: string, userId: string) {
    const task = await this.prismaService.task.findFirst({
      where: {
        id,
        OR: [{ createdById: userId }, { assigneeId: userId }],
      },
    });

    if (!task) {
      throw new NotFoundException('Task not found');
    }

    return this.prismaService.task.delete({
      where: { id },
    });
  }

  async getViewTasks(
    userId: string,
    groupBy: TaskGroupBy,
  ): Promise<TasksGroupedByStatus> {
    const tasks = await this.prismaService.task.findMany({
      where: {
        OR: [{ createdById: userId }, { assigneeId: userId }],
      },
      orderBy: {
        createdAt: 'asc',
      },
    });

    if (groupBy !== 'status') {
      throw new BadRequestException(`Unsupported groupBy`);
    }

    const groups: TasksGroupedByStatus = {
      [TaskStatus.NOT_STARTED]: {
        count: 0,
        tasks: [],
      },
      [TaskStatus.IN_PROGRESS]: {
        count: 0,
        tasks: [],
      },
      [TaskStatus.DONE]: {
        count: 0,
        tasks: [],
      },
    };

    for (const task of tasks) {
      const group = groups[task.status];

      group.tasks.push(task);
      group.count += 1;
    }

    return groups;
  }
}
