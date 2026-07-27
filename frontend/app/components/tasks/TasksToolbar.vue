<script setup lang="ts">
import {
  ArrowDownUp,
  CircleDot,
  Filter,
  ListChecks, Plus,
  Search,
  SlidersHorizontal,
  Sparkles,
  Star,
  Zap,
} from 'lucide-vue-next'

import { Button } from '@/components/ui/button'

const emit = defineEmits<{
  (e: 'addTask'): void
}>()

const views = [
  { name: 'All Tasks', icon: Star, active: true },
  { name: 'By Status', icon: CircleDot, active: false },
  { name: 'Checklist', icon: ListChecks, active: false },
]

const tableActions = [
  { label: 'Filter', icon: Filter },
  { label: 'Sort', icon: ArrowDownUp },
  { label: 'Automations', icon: Zap },
  { label: 'Customize', icon: Sparkles },
  { label: 'Search', icon: Search },
  { label: 'Properties', icon: SlidersHorizontal },
]
</script>

<template>
  <div class="mb-4 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
    <div class="flex flex-wrap items-center gap-2">
      <Button
          v-for="view in views"
          :key="view.name"
          type="button"
          :variant="view.active ? 'secondary' : 'ghost'"
          size="sm"
          class="h-9 rounded-full px-3 text-sm font-semibold text-zinc-700"
          :class="view.active ? 'bg-zinc-100 text-zinc-950 shadow-none hover:bg-zinc-100' : 'hover:bg-zinc-50'"
      >
        <component :is="view.icon" class="size-4" />
        {{ view.name }}
      </Button>
    </div>

    <div class="flex items-center justify-between gap-2 sm:justify-end">
      <div class="flex items-center gap-1">
        <Button
            type="button"
            class="flex items-center gap-2 rounded-lg p-2 text-sm font-medium bg-orange-600 text-white  shadow-lg shadow-orange-600/25 transition-all duration-200 hover:-translate-y-0.5 hover:bg-orange-700 hover:shadow-xl hover:shadow-orange-600/30 focus-visible:ring-3 focus-visible:ring-orange-600/25 md:bottom-10 md:right-15"
            @click="emit('addTask')"
        >
          <Plus class="size-4" />
          New task
        </Button>

        <Button
            v-for="action in tableActions"
            :key="action.label"
            type="button"
            variant="ghost"
            size="icon-sm"
            class="text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900"
            :aria-label="action.label"
        >
          <component :is="action.icon" class="size-4" />
        </Button>
      </div>
    </div>
  </div>
</template>
