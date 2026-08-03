export enum TaskStatus {
  NOT_STARTED = 'NOT_STARTED',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE',
}

export interface Task {
  id: string
  title: string
  description?: string | null
  status: TaskStatus
  dueDate?: string | null
  createdById: string
  assigneeId?: string | null
  workspaceId?: string
  createdAt: string
  updatedAt: string
}

export interface CreateTaskDto {
  title?: string
  description?: string
  status?: TaskStatus
  dueDate?: string | null
  assigneeId?: string | null
  workspaceId?: string
}

export interface UpdateTaskDto {
  title?: string
  description?: string | null
  status?: TaskStatus
  dueDate?: string | null
  assigneeId?: string | null
  workspaceId?: string
}

export interface TaskGroup {
  count: number
  tasks: Task[]
}

export type TasksGroupedByStatus =
  Record<TaskStatus, TaskGroup>
