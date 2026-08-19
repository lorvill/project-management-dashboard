<script lang="ts" setup>
import type { ToasterProps } from "vue-sonner"
import { PhCheckCircle, PhCircleNotch, PhInfo, PhWarning, PhXCircle } from '@phosphor-icons/vue'
import { Toaster as Sonner } from "vue-sonner"
import { cn } from "@/lib/utils"

const props = defineProps<ToasterProps>()
</script>

<template>
  <Sonner
    :class="cn('toaster group', props.class)"
    :style="{
      '--normal-bg': 'var(--popover)',
      '--normal-text': 'var(--popover-foreground)',
      '--normal-border': 'var(--border)',
      '--border-radius': 'var(--radius)',
    }"
    v-bind="props"
    position="top-center"
    :duration="2500"
    rich-colors
    :close-button="false"
  >
    <template #success-icon>
      <PhCheckCircle class="size-4" />
    </template>
    <template #info-icon>
      <PhInfo class="size-4" />
    </template>
    <template #warning-icon>
      <PhWarning class="size-4" />
    </template>
    <template #error-icon>
      <PhXCircle class="size-4" />
    </template>
    <template #loading-icon>
      <div>
        <PhCircleNotch class="size-4 animate-spin" />
      </div>
    </template>
  </Sonner>
</template>

<style>
.toaster[data-sonner-toaster] {
  --width: min(420px, calc(100vw - 2rem));
  --border-radius: 0.875rem;
  font-family: var(--font-sans);
}

.toaster[data-sonner-toaster][data-y-position='top'] {
  top: max(var(--offset-top), env(safe-area-inset-top));
}

.toaster [data-sonner-toast][data-styled='true'] {
  gap: 0.625rem;
  min-height: 3.25rem;
  padding: 0.875rem 1rem;
  border-color: color-mix(in oklch, var(--normal-border) 80%, transparent);
  box-shadow:
    0 18px 48px rgb(15 23 42 / 0.14),
    0 4px 14px rgb(15 23 42 / 0.08);
}

.toaster [data-sonner-toast][data-styled='true'] [data-title] {
  font-size: 0.875rem;
  font-weight: 700;
  line-height: 1.3;
}

.toaster [data-sonner-toast][data-styled='true'] [data-description] {
  font-size: 0.8125rem;
  line-height: 1.45;
}

.toaster [data-sonner-toast][data-styled='true'] [data-icon] {
  width: 1rem;
  height: 1rem;
}

.toaster [data-sonner-toast][data-type='success'] [data-icon] {
  color: oklch(0.58 0.16 145);
}

.toaster [data-sonner-toast][data-type='info'] [data-icon] {
  color: oklch(0.57 0.16 255);
}

.toaster [data-sonner-toast][data-type='warning'] [data-icon] {
  color: oklch(0.67 0.16 75);
}

.toaster [data-sonner-toast][data-type='error'] [data-icon] {
  color: var(--destructive);
}

</style>
