<script setup lang="ts">
import { nextTick, ref } from 'vue'
import { TableCell, TableRow } from '@/components/ui/table'
import { TaskStatus } from '~/queries/tasks/tasks.dto'
import TaskStatusDropdown from '~/components/tasks/TaskStatusDropdown.vue'

const emit = defineEmits<{
  (e: 'create', payload: { title: string; status: TaskStatus }): void
  (e: 'cancel'): void
}>()

const title = ref('')
const status = ref<TaskStatus>(TaskStatus.NOT_STARTED)
const inputRef = ref<HTMLInputElement | null>(null)

const focus = async () => {
  await nextTick()
  inputRef.value?.focus()
}

const submit = () => {
  const trimmed = title.value.trim()

  if (!trimmed) {
    emit('cancel')
    return
  }

  emit('create', { title: trimmed, status: status.value })
}

defineExpose({ focus })
</script>

<template>
  <TableRow class="h-9 border-zinc-200 bg-zinc-50/70">
    <TableCell class="px-3 py-0 text-zinc-400">
      <div class="flex items-center gap-3">
        <input
            ref="inputRef"
            v-model="title"
            type="text"
            class="h-9 w-full min-w-0 bg-transparent text-sm font-medium text-zinc-800 outline-none placeholder:text-zinc-400"
            @keydown.enter.prevent="submit"
            @keydown.esc.prevent="emit('cancel')"
            @blur="submit"
        >
      </div>
    </TableCell>

    <TableCell class="border-l border-zinc-200 px-3 py-0">
      <TaskStatusDropdown v-model="status" />
    </TableCell>

    <TableCell class="border-l border-zinc-200 p-0" />
    <TableCell class="border-l border-zinc-200 p-0" />
    <TableCell class="border-l border-zinc-200 p-0" />
    <TableCell class="border-l border-zinc-200 p-0" />
  </TableRow>
</template>
