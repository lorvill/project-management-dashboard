<script setup lang="ts">
import type { CalendarCellTriggerProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { reactiveOmit } from '@vueuse/core'
import { CalendarCellTrigger, useForwardProps } from 'reka-ui'
import { cn } from '@/lib/utils'

const props = withDefaults(
    defineProps<CalendarCellTriggerProps & { class?: HTMLAttributes['class'] }>(),
    {
      as: 'button',
    },
)

const delegatedProps = reactiveOmit(props, 'class')
const forwardedProps = useForwardProps(delegatedProps)
</script>

<template>
  <CalendarCellTrigger
      data-slot="calendar-cell-trigger"
      :class="cn(
      'grid size-9 place-items-center rounded-full text-sm font-normal transition-colors',
      'text-slate-700 hover:bg-orange-50 hover:text-orange-700',
      'data-today:bg-orange-50 data-today:font-bold data-today:text-orange-700',
      'data-selected:bg-orange-400 data-selected:font-bold data-selected:text-white',
      'aria-selected:bg-orange-400 aria-selected:font-bold aria-selected:text-white',
      'data-outside-view:text-slate-300',
      'data-disabled:pointer-events-none data-disabled:opacity-40',
      props.class,
    )"
      v-bind="forwardedProps"
  >
    <slot />
  </CalendarCellTrigger>
</template>