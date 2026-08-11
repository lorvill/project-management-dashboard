<script setup lang="ts">
import { inject, nextTick } from 'vue'
import {
  CalendarDays,
  CircleHelp,
  Columns3,
  MoreHorizontal,
  Plus,
  Sparkles,
  Users,
} from 'lucide-vue-next'
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '~/components/ui/table'
import TaskRow from '~/components/tasks/views/all-tasks/details/TaskRow.vue'
import NewTaskRow from "~/components/tasks/views/all-tasks/details/NewTaskRow.vue";
import { useTasksQuery } from '~/queries/tasks/all-tasks.query'
import { useCreateTaskMutation } from '~/queries/tasks/mutations/create-task.mutation'
import { useUpdateTaskMutation } from '~/queries/tasks/mutations/update-task.mutation'
import { useDeleteTaskMutation } from '~/queries/tasks/mutations/delete-task.mutation'
import {type CreateTaskDto, type Task, TaskSort, TaskStatus, type UpdateTaskDto} from '~/queries/tasks/tasks.dto'
import {tasksLayoutKey} from "~/utils/tasks/tasks.utils";
import {useRouteQuery} from "@vueuse/router";

const tasksLayout = inject(tasksLayoutKey)
if (!tasksLayout) {
  throw new Error('TasksAll must be used in tasks layout')
}

const {
  isCreatingTask,
  closeNewTaskInput,
} = tasksLayout

const newTaskRow = useTemplateRef('new-task-row')

const statusFilter = useRouteQuery<TaskStatus>('status') //ref
const sortOrder = useRouteQuery<TaskSort>('sort')

const { data: tasks } = useTasksQuery({
  status: statusFilter,
  sort: sortOrder,
})

const createTask = useCreateTaskMutation()
const updateTask = useUpdateTaskMutation()
const deleteTask = useDeleteTaskMutation()

watch(isCreatingTask, async (isCreating) => {
  if (!isCreating) return

  await nextTick()
  newTaskRow.value?.focus()
})

const handleCreateTask = (payload: CreateTaskDto) => {
  createTask.mutate({
    title: payload.title,
    description: '',
    status: payload.status,
  })
  closeNewTaskInput()
}

const handleUpdateTask = (id: string, patch: UpdateTaskDto) => {
  updateTask.mutate({ id, ...patch })
}

const handleDuplicateTask = (task: Task) => {
  createTask.mutate({
    title: `${task.title}`,
    description: task.description ?? undefined,
    status: task.status,
    dueDate: task.dueDate,
    assigneeId: task.assigneeId,
    workspaceId: task.workspaceId,
  })
}

const handleRemoveTask = (id: string) => {
  deleteTask.mutate(id)
}
</script>

<template>
  <div class="hidden overflow-hidden border-b border-zinc-200 sm:block">
    <Table class="min-w-245 table-fixed">
      <TableHeader>
        <TableRow class="border-zinc-200 hover:bg-transparent">
          <TableHead class="w-[27%] px-3 text-zinc-500">
            Task name
          </TableHead>

        <TableHead class="w-[13%] px-3 text-zinc-500">
          <div class="flex items-center gap-2">
            <Sparkles class="size-4 text-zinc-400" />
            Status
          </div>
        </TableHead>

        <TableHead class="w-[15%] px-3 text-zinc-500">
          <div class="flex items-center gap-2">
            <Users class="size-4 text-zinc-400" />
            Assignee

            <TooltipProvider :delay-duration="250">
              <Tooltip>
                <TooltipTrigger as-child>
                  <button
                      type="button"
                      class="inline-flex size-5 items-center justify-center rounded-full text-zinc-400 transition-colors hover:bg-zinc-100 hover:text-zinc-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 focus-visible:ring-offset-1"
                      aria-label="About the assignee column"
                  >
                    <CircleHelp class="size-4" />
                  </button>
                </TooltipTrigger>
                <TooltipContent
                    side="top"
                    :side-offset="8"
                    class="max-w-40 rounded-lg bg-zinc-900 px-3 py-2 text-xs font-medium leading-relaxed text-white shadow-lg shadow-black/15"
                >
                  The person responsible for completing the task.
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </TableHead>

        <TableHead class="w-[13%] px-3 text-zinc-500">
          <div class="flex items-center gap-2">
            <CalendarDays class="size-4 text-zinc-400" />
            Due date
          </div>
        </TableHead>

        <TableHead class="w-[28%] px-3 text-zinc-500">
          <div class="flex items-center gap-2">
            <Columns3 class="size-4 text-zinc-400" />
            Description
          </div>
        </TableHead>

        <TableHead class="w-[4%] px-2 text-zinc-500">
          <div class="flex items-center justify-center gap-2">
            <Plus class="size-4" />
            <MoreHorizontal class="size-4" />
          </div>
        </TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        <TaskRow
          v-for="task in tasks"
          :key="task.id"
          :task="task"
          @update="handleUpdateTask"
          @duplicate="handleDuplicateTask"
          @remove="handleRemoveTask"
        />

        <NewTaskRow
          v-if="isCreatingTask"
          ref="new-task-row"
          @create="handleCreateTask"
          @cancel="closeNewTaskInput"
        />
      </TableBody>
    </Table>
  </div>
</template>
