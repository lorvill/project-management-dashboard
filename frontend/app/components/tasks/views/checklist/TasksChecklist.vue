<script setup lang="ts">
import { nextTick } from 'vue'
import { Check, CircleCheck, LoaderCircle, StickyNote, Plus } from 'lucide-vue-next'
import { useRouteQuery } from '@vueuse/router'
import { useTasksQuery } from '~/queries/tasks/all-tasks.query'
import { useCreateTaskMutation } from '~/queries/tasks/mutations/create-task.mutation'
import { useUpdateTaskMutation } from '~/queries/tasks/mutations/update-task.mutation'
import {TaskSort, TaskStatus, type Task, type UpdateTaskDto} from '~/queries/tasks/tasks.dto'
import TaskActionsContextMenu from "~/components/tasks/TaskActionsContextMenu.vue";
import {useDeleteTaskMutation} from "~/queries/tasks/mutations/delete-task.mutation";
import {useTaskCreation} from "~/composables/tasks/useTaskCreation";

const {
  isCreatingTask,
  closeNewTaskInput,
  showNewTaskInput
} = useTaskCreation()

const emit = defineEmits<{
  (e: 'duplicate', task: Task): void
  (e: 'remove', id: string): void
}>()

const statusFilter = useRouteQuery<TaskStatus>('status')
const sortOrder = useRouteQuery<TaskSort>('sort', TaskSort.NEWEST)

const { data: tasks } = useTasksQuery({ status: statusFilter, sort: sortOrder })
const createTask = useCreateTaskMutation()
const deleteTask = useDeleteTaskMutation()
const updateTask = useUpdateTaskMutation()

const newTaskTitle = ref('')
const newTaskInput = useTemplateRef<HTMLInputElement>('new-task-input')

watch(isCreatingTask, async (isCreating) => {
  if (!isCreating) return
  await nextTick()
  newTaskInput.value?.focus()
})

function submitTask() {
  const title = newTaskTitle.value.trim()
  if (!title) return

  createTask.mutate({ title, description: '', status: TaskStatus.NOT_STARTED })
  newTaskTitle.value = ''
  closeNewTaskInput()
}

function cancelCreation() {
  newTaskTitle.value = ''
  closeNewTaskInput()
}

function toggleTask(task: Task) {
  updateTask.mutate({
    id: task.id,
    status: task.status === TaskStatus.DONE ? TaskStatus.NOT_STARTED : TaskStatus.DONE,
  })
}
function duplicateTask(task: Task) {
  createTask.mutate({
    title: `${task.title}`,
    description: task.description ?? undefined,
    status: task.status,
    dueDate: task.dueDate,
    assigneeId: task.assigneeId,
    workspaceId: task.workspaceId,
  })
}

function removeTask(id: string) {
  deleteTask.mutate(id)
}
</script>

<template>
  <div class="w-full max-w-3xl py-1">
    <div class="space-y-1">
      <TaskActionsContextMenu
          v-for="task in tasks"
          :key="task.id"
          @duplicate="duplicateTask(task)"
          @remove="removeTask(task.id)"
      >
        <label
            class="group flex min-h-11 cursor-pointer items-center gap-4 rounded px-1 text-zinc-800
      hover:bg-zinc-50"
        >
          <span
            class="flex size-5 shrink-0 items-center justify-center rounded border transition-colors"
            :class="task.status === TaskStatus.DONE
              ? 'border-blue-500 bg-blue-500 text-white'
              : 'border-zinc-300 bg-white text-transparent'"
          >
            <Check class="size-4 stroke-3" />
          </span>
          <input
            type="checkbox"
            class="sr-only"
            :checked="task.status === TaskStatus.DONE"
            @change="toggleTask(task)"
          >

          <CircleCheck
            v-if="task.status === TaskStatus.DONE"
            class="size-5 shrink-0 fill-emerald-600 text-white"
          />
          <LoaderCircle
            v-else-if="task.status === TaskStatus.IN_PROGRESS"
            class="size-5 shrink-0 text-zinc-600"
          />
          <StickyNote v-else class="size-5 shrink-0 text-zinc-500" />

          <span class="min-w-0 text-base font-semibold leading-6 text-zinc-800">
            {{ task.title }}
          </span>

        </label>
      </TaskActionsContextMenu>

      <form
        v-if="isCreatingTask"
        class="flex min-h-11 items-center gap-4 px-1"
        @submit.prevent="submitTask"
      >
        <span class="size-5 shrink-0 rounded border border-zinc-300" />
        <CircleCheck class="size-5 shrink-0 fill-emerald-600 text-white" />
        <input
          ref="new-task-input"
          v-model="newTaskTitle"
          class="min-w-0 flex-1 bg-transparent text-base font-semibold text-zinc-800 outline-none placeholder:font-normal placeholder:text-zinc-400"
          placeholder="New task"
          @keydown.escape="cancelCreation"
          @blur="newTaskTitle.trim() ? submitTask() : cancelCreation()"
        >
      </form>

      <button
        v-else
        type="button"
        class="flex min-h-11 items-center gap-3 px-1 text-base text-zinc-400 transition-colors hover:text-zinc-700"
        @click="showNewTaskInput"
      >
        <Plus class="size-5" />
        New task
      </button>
    </div>
  </div>
</template>
