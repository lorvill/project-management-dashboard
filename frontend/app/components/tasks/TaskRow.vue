<script setup lang="ts">
import type { Task, UpdateTaskDto } from '~/queries/tasks/tasks.dto'
import { TableCell, TableRow } from '@/components/ui/table'
import EditableTextCell from '~/components/tasks/EditableTextCell.vue'
import EditableDateCell from '~/components/tasks/EditableDateCell.vue'
import TaskStatusDropdown from '~/components/tasks/TaskStatusDropdown.vue'

const props = defineProps<{ task: Task }>()

const emit = defineEmits<{
  (e: 'update', id: string, patch: UpdateTaskDto): void
}>()
</script>

<template>
  <TableRow class="h-9 border-slate-200 hover:bg-zinc-400/10">
    <TableCell class="h-9 p-0 text-zinc-800">
      <EditableTextCell
          :model-value="task.title"
          display-class="font-semibold"
          @update:model-value="(value) => emit('update', task.id, { title: value })"
      >
        {{ task.title }}
      </EditableTextCell>
    </TableCell>

    <TableCell class="border-l border-zinc-200 px-3 py-0">
      <TaskStatusDropdown
          :model-value="task.status"
          @update:model-value="(status) => emit('update', task.id, { status })"
      />
    </TableCell>

    <TableCell class="border-l border-zinc-200 px-3 py-0">
      <div v-if="task.assigneeId" class="flex min-w-0 items-center gap-2 text-zinc-600">
        <span class="truncate">{{ task.assigneeId }}</span>
      </div>
    </TableCell>

    <TableCell class="h-9 border-l border-zinc-200 p-0 text-zinc-600">
      <EditableDateCell
          :model-value="task.dueDate"
          @update:model-value="(dueDate) => emit('update', task.id, { dueDate })"
      />
    </TableCell>

    <TableCell class="h-9 border-l border-zinc-200 p-0 text-zinc-700">
      <EditableTextCell
          :model="task.description"
          @update:model-value="(value) => emit('update', task.id, { description: value })"
      >
        {{ task.description }}
      </EditableTextCell>
    </TableCell>

    <TableCell class="border-l border-zinc-200 px-2 py-0" />
  </TableRow>
</template>
