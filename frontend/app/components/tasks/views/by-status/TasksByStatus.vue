<script setup lang="ts">
import {
  Check, Circle,
  CircleDashed,
  LoaderCircle,
  Plus,
} from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import type {Task, TaskStatus} from "~/queries/tasks/tasks.dto";
import {useGroupedTasksQuery} from "~/queries/tasks/grouped-tasks.query";

interface Column {
  status: TaskStatus
  label: string
  icon: Component
  wrapperClass: string
  badgeClass: string
  iconClass: string
  addButtonClass: string
  taskIconWrapperClass: string
}

const { data: groups } = useGroupedTasksQuery()

const emit = defineEmits<{
  addTask: [payload: { title: string; status: TaskStatus }]
  taskClick: [task: Task]
}>()

const columns: Column[] = [
  {
    status: 'NOT_STARTED',
    label: 'Not started',
    icon: CircleDashed,
    wrapperClass: 'bg-stone-50/90',
    badgeClass: 'bg-stone-200 text-stone-700',
    iconClass: 'text-stone-500',
    addButtonClass:
        'border-stone-200 text-stone-600 hover:border-stone-300 hover:bg-stone-100',
    taskIconWrapperClass: 'bg-stone-200 text-stone-600',
  },
  {
    status: 'IN_PROGRESS',
    label: 'In progress',
    icon: Circle,
    wrapperClass: 'bg-blue-50/70',
    badgeClass: 'bg-blue-100 text-blue-700',
    iconClass: 'text-blue-500',
    addButtonClass:
        'border-blue-100 text-blue-600 hover:border-blue-200 hover:bg-blue-50',
    taskIconWrapperClass: 'bg-blue-100 text-blue-600',
  },
  {
    status: 'DONE',
    label: 'Done',
    icon: Check,
    wrapperClass: 'bg-emerald-50/50',
    badgeClass: 'bg-emerald-100 text-emerald-800',
    iconClass: 'text-emerald-600',
    addButtonClass:
        'border-emerald-100 text-emerald-700 hover:border-emerald-200 hover:bg-emerald-50',
    taskIconWrapperClass: 'bg-emerald-600 text-white',
  },
]

const columnByStatus = Object.fromEntries(
    columns.map(column => [column.status, column]),
) as Record<TaskStatus, Column>

function getColumn(status: TaskStatus): Column {
  return columnByStatus[status]
}

const activeColumn = ref<TaskStatus | null>(null)

const newTaskTitles = reactive<Record<TaskStatus, string>>({
  NOT_STARTED: '',
  IN_PROGRESS: '',
  DONE: '',
})

function openNewTask(status: TaskStatus) {
  activeColumn.value = status

  nextTick(() => {
    document
        .querySelector<HTMLInputElement>(`[data-task-input="${status}"]`)
        ?.focus()
  })
}

function closeNewTask(status: TaskStatus) {
  newTaskTitles[status] = ''
  activeColumn.value = null
}

function createTask(status: TaskStatus) {
  const title = newTaskTitles[status].trim()

  if (!title)
    return

  emit('addTask', {
    title,
    status,
  })

  newTaskTitles[status] = ''
  activeColumn.value = null
}

function handleInputBlur(status: TaskStatus) {
  if (!newTaskTitles[status].trim())
    closeNewTask(status)
}
</script>

<template>
  <div
      class="
      grid min-w-max grid-cols-3 items-start gap-4
      lg:min-w-0
    "
  >
    <section
        v-for="column in columns"
        :key="column.status"
        class="min-h-40 min-w-80 rounded-2xl p-3"
        :class="column.wrapperClass"
    >
      <header class="mb-4 flex items-center gap-2 px-1">
        <div
            class="
            flex h-8 items-center gap-2 rounded-full px-3
            text-sm font-medium
          "
            :class="column.badgeClass"
        >
          <component
              :is="column.icon"
              class="size-4"
              :class="[column.iconClass, column.status === 'IN_PROGRESS' && 'animate-spin']"
          />

          <span>{{ column.label }}</span>
        </div>

        <span class="text-sm text-muted-foreground">
          {{ groups?.[column.status]?.count ?? 0 }}
        </span>
      </header>

      <div class="space-y-2">
        <div
            v-if="activeColumn === column.status"
            class="
            rounded-2xl border bg-background p-3 shadow-sm
            transition-all duration-200
          "
            :class="
            column.status === 'IN_PROGRESS'
              ? 'border-blue-200'
              : 'border-border'
          "
        >
          <form
              class="flex items-center gap-2"
              @submit.prevent="createTask(column.status)"
          >
            <component
                :is="column.icon"
                class="size-5 shrink-0"
                :class="column.iconClass"
            />

            <Input
                v-model="newTaskTitles[column.status]"
                :data-task-input="column.status"
                placeholder="New task"
                class="
                h-auto border-0 bg-transparent p-0 text-base font-medium
                shadow-none
                focus-visible:ring-0
              "
                @keydown.escape="closeNewTask(column.status)"
                @blur="handleInputBlur(column.status)"
            />
          </form>
        </div>

        <button
            v-for="task in groups?.[column.status]?.tasks ?? []"
            :key="task.id"
            type="button"
            class="
            group w-full rounded-2xl border border-border/80
            bg-background px-4 py-4 text-left shadow-sm
            transition-all duration-200
            hover:-translate-y-0.5 hover:border-border
            hover:shadow-md
            focus-visible:outline-none focus-visible:ring-2
            focus-visible:ring-ring focus-visible:ring-offset-2
          "
            @click="emit('taskClick', task)"
        >
          <div class="flex items-start gap-3">
            <div
                class="
                mt-0.5 flex size-5 shrink-0 items-center
                justify-center rounded-full
              "
                :class="getColumn(task.status).taskIconWrapperClass"
            >
              <component
                  :is="getColumn(task.status).icon"
                  class="size-3.5 stroke-3"
                  :class="task.status === 'IN_PROGRESS' && 'animate-spin'"
              />
            </div>

            <div class="min-w-0 flex-1">
              <p
                  class="
                  wrap-break-word text-base font-semibold leading-6
                  text-foreground
                "
                  :class="task.status === 'DONE' && 'text-muted-foreground line-through'"
              >
                {{ task.title }}
              </p>
            </div>
          </div>
        </button>

        <Button
            v-if="activeColumn !== column.status"
            type="button"
            variant="outline"
            class="
            h-auto w-full justify-start rounded-2xl bg-transparent
            px-4 py-4 text-base font-normal shadow-none
            transition-all duration-200
          "
            :class="column.addButtonClass"
            @click="openNewTask(column.status)"
        >
          <Plus class="mr-1 size-5" />
          New task
        </Button>
      </div>
    </section>
  </div>
</template>