import {
  BadRequestException,
  Injectable,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, Task } from '../../../generated/prisma/client';
import { UpdateTaskDto } from './dto/update-task.dto';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskStatus } from '../../../generated/prisma/enums';
import { TaskGroupBy, TasksGroupedByStatus } from './dto/view.dto';
import { FilterAndSortDto, TaskSort } from './dto/filter-and-sort.dto';

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

  async getAll(userId: string, query: FilterAndSortDto): Promise<Task[]> {
    const { status, sort } = query;

    const where: Prisma.TaskWhereInput = {
      OR: [{ createdById: userId }, { assigneeId: userId }],
    };

    if (status) {
      where.status = status;
    }

    return this.prismaService.task.findMany({
      where,
      orderBy: { createdAt: sort === TaskSort.OLDEST ? 'desc' : 'asc' },
    });
  }

  async update(id: string, data: UpdateTaskDto) {
    return this.prismaService.task.update({
      where: { id },
      data,
    });
  }

  async delete(id: string, userId: string) {
    return this.prismaService.task.delete({
      where: {
        id,
        OR: [{ createdById: userId }, { assigneeId: userId }],
      },
    });
  }

  async getViewTasks(
    userId: string,
    groupBy: TaskGroupBy,
  ): Promise<TasksGroupedByStatus> {
    if (groupBy !== 'status') {
      throw new BadRequestException(`Unsupported groupBy`);
    }

    const rows = await this.prismaService.$queryRaw<
      { status: TaskStatus; count: number; tasks: Task[] }[]
    >`
      SELECT
        t.status,
        COUNT(*)::int AS count,
        jsonb_agg(
          jsonb_build_object(
            'id', t.id,
            'title', t.title,
            'description', t.description,
            'status', t.status,
            'dueDate', t.due_date,
            'createdById', t.created_by_id,
            'assigneeId', t.assignee_id,
            'workspaceId', t.workspace_id,
            'createdAt', t.created_at,
            'updatedAt', t.updated_at
          )
        ORDER BY t.created_at ASC
      ) AS tasks
      FROM tasks AS t
      WHERE t.created_by_id = ${userId}
         OR t.assignee_id = ${userId}
      GROUP BY t.status
    `;

    const groups: TasksGroupedByStatus = {
      [TaskStatus.NOT_STARTED]: { count: 0, tasks: [] },
      [TaskStatus.IN_PROGRESS]: { count: 0, tasks: [] },
      [TaskStatus.DONE]: { count: 0, tasks: [] },
    };

    for (const row of rows) {
      groups[row.status] = {
        count: row.count,
        tasks: row.tasks,
      };
    }

    return groups;
  }
}
