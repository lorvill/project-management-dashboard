<script setup lang="ts">
import type { DateValue } from 'reka-ui'
import { parseDate } from '@internationalized/date'
import { X } from 'lucide-vue-next'
import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { formatDueDate, toDateInputValue } from '~/utils/date'

const modelValue = defineModel<string | null>({
  default: null,
})

const isOpen = ref(false)

const selectedDate = computed<DateValue | undefined>(() => {
  const value = toDateInputValue(modelValue.value)

  return value ? parseDate(value) : undefined
})

const selectDate = (date: DateValue | undefined) => {
  if (!date) return

  modelValue.value = new Date(date.toString()).toISOString()
  isOpen.value = false
}

const clearDate = () => {
  modelValue.value = null
  isOpen.value = false
}
</script>

<template>
  <Popover v-model:open="isOpen">
    <PopoverTrigger as-child>
      <button
          type="button"
          class="flex h-9 w-full items-center gap-2 px-3 text-left text-sm outline-none"
      >
        <span v-if="modelValue" class="truncate">
          {{ formatDueDate(modelValue) }}
        </span>
      </button>
    </PopoverTrigger>

    <PopoverContent
        align="start"
        :side-offset="4"
        class="w-auto bg-white p-0"
    >
      <Calendar
          :model-value="selectedDate"
          layout="month-and-year"
          initial-focus
          @update:model-value="selectDate"
      />

      <div
          v-if="modelValue"
          class="border-t border-zinc-200 p-2"
      >
        <button
            type="button"
            class="flex h-8 w-full items-center justify-center gap-2 rounded-md
            text-sm text-zinc-600"
            @click="clearDate"
        >
          <X class="size-4" />
          Clear date
        </button>
      </div>
    </PopoverContent>
  </Popover>
</template>
