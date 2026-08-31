<script setup lang="ts">
import { Copy, Trash } from 'lucide-vue-next'
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from '@/components/ui/context-menu'

withDefaults(defineProps<{
  disabled?: boolean
  duplicateDisabled?: boolean
  removeDisabled?: boolean
}>(), {
  disabled: false,
  duplicateDisabled: false,
  removeDisabled: false,
})

const emit = defineEmits<{
  duplicate: []
  remove: []
}>()
</script>

<template>
  <ContextMenu>
    <ContextMenuTrigger as-child :disabled="disabled">
      <slot />
    </ContextMenuTrigger>

    <ContextMenuContent class="w-44 bg-white">
      <ContextMenuItem
        :disabled="duplicateDisabled"
        class="cursor-pointer"
        @select="emit('duplicate')"
      >
        <Copy />
        Duplicate
      </ContextMenuItem>

      <ContextMenuItem
        variant="destructive"
        :disabled="removeDisabled"
        class="cursor-pointer"
        @select="emit('remove')"
      >
        <Trash />
        Move to trash
      </ContextMenuItem>
    </ContextMenuContent>
  </ContextMenu>
</template>
