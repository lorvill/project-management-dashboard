import { IsIn } from 'class-validator';
import { TaskStatus } from '../../../../generated/prisma/enums';
import { Task } from '../../../../generated/prisma/client';

export const taskGroupedByFields = ['status'] as const;

export type TaskGroupBy = (typeof taskGroupedByFields)[number];

export class TaskViewQueryDto {
  @IsIn(taskGroupedByFields, {
    message: `groupBy must be one of: ${taskGroupedByFields.join(', ')}`,
  })
  groupBy!: TaskGroupBy;
}

export interface TaskGroup {
  count: number;
  tasks: Task[];
}

export type TasksGroupedByStatus = Record<TaskStatus, TaskGroup>;