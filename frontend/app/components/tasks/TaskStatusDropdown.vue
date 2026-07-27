<script setup lang="ts">
import { Check } from 'lucide-vue-next'
import { Badge } from '@/components/ui/badge'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { TaskStatus } from '~/queries/tasks/tasks.dto'

const model = defineModel<TaskStatus>({ required: true })

const statusOptions: TaskStatus[] = [
  TaskStatus.NOT_STARTED,
  TaskStatus.IN_PROGRESS,
  TaskStatus.DONE,
]

const statusLabels: Record<TaskStatus, string> = {
  [TaskStatus.DONE]: 'Done',
  [TaskStatus.IN_PROGRESS]: 'In progress',
  [TaskStatus.NOT_STARTED]: 'Not started',
}

const statusClasses: Record<TaskStatus, string> = {
  [TaskStatus.DONE]: 'bg-emerald-100 text-emerald-800 hover:bg-emerald-100',
  [TaskStatus.IN_PROGRESS]: 'bg-blue-100 text-blue-800 hover:bg-blue-100',
  [TaskStatus.NOT_STARTED]: 'bg-zinc-100 text-zinc-600 hover:bg-zinc-100',
}

const statusDotClasses: Record<TaskStatus, string> = {
  [TaskStatus.DONE]: 'bg-emerald-500',
  [TaskStatus.IN_PROGRESS]: 'bg-blue-500',
  [TaskStatus.NOT_STARTED]: 'bg-zinc-400',
}
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <button type="button">
        <Badge
            variant="secondary"
            class="h-6 gap-1.5 rounded-full px-2.5 text-sm font-medium"
            :class="statusClasses[model]"
        >
          <span class="size-2 rounded-full" :class="statusDotClasses[model]" />
          {{ statusLabels[model] }}
        </Badge>
      </button>
    </DropdownMenuTrigger>

    <DropdownMenuContent align="start" class="bg-white">
      <DropdownMenuItem
          v-for="option in statusOptions"
          :key="option"
          class="gap-2"
          @select="model = option"
      >
        <span class="size-2 rounded-full" :class="statusDotClasses[option]" />
        {{ statusLabels[option] }}
        <Check v-if="option === model" class="ml-auto size-4" />
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
