<script setup lang="ts">
import { Button } from '@/components/ui/button'

const props = withDefaults(
    defineProps<{
      title: string
      description: string
      actionLabel?: string
      size?: 'md' | 'sm'
    }>(),
    {
      size: 'md',
    },
)

const emit = defineEmits<{
  action: []
}>()

const minHeightClass = computed(() =>
    props.size === 'sm' ? 'min-h-44' : 'min-h-72',
)
</script>

<template>
  <div
      class="flex flex-col items-center justify-center rounded-lg border border-dashed border-slate-200 bg-white/70 px-6 text-center"
      :class="minHeightClass"
  >
    <h2
        class="font-semibold text-slate-950"
        :class="size === 'sm' ? 'text-base' : 'text-lg'"
    >
      {{ title }}
    </h2>

    <p class="mt-2 max-w-sm text-sm leading-6 text-slate-500">
      {{ description }}
    </p>

    <Button
        v-if="actionLabel"
        type="button"
        class="mt-5"
        @click="emit('action')"
    >
      {{ actionLabel }}
    </Button>
  </div>
</template>