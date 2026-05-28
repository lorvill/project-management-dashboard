<script setup lang="ts">
import { Plus } from 'lucide-vue-next'

import { Card } from '@/components/ui/card'

const emit = defineEmits<{
  create: []
}>()
</script>

<template>
  <Card
    role="button"
    tabindex="0"
    class="flex min-h-56 cursor-pointer items-center justify-center rounded-lg border-2 border-dashed border-slate-300 bg-white/70 py-0 shadow-none transition-all duration-200 hover:border-orange-600 hover:bg-orange-50/70 hover:shadow-xs focus-visible:border-orange-600 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-orange-600/20"
    @click="emit('create')"
    @keydown.enter.prevent="emit('create')"
    @keydown.space.prevent="emit('create')"
  >
    <div class="flex flex-col items-center gap-3 text-slate-400 transition-colors group-hover:text-orange-600">
      <div class="grid size-14 place-items-center rounded-full border border-dashed border-current">
        <Plus class="size-7" />
      </div>

      <span class="text-sm font-semibold text-amber-900">
        Create note
      </span>
    </div>
  </Card>
</template>
