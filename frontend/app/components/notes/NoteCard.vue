<script setup lang="ts">
import {
  Copy,
  Pin,
  PinOff,
  Send,
  Trash2,
} from 'lucide-vue-next'

import type { Note } from '~~/types/note.types'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from '@/components/ui/context-menu'

const props = defineProps<{
  note: Note
}>()

const emit = defineEmits<{
  share: [note: Note]
  delete: [note: Note]
  togglePin: [note: Note]
  duplicate: [note: Note]
}>()

const createdDate = computed(() =>
  new Intl.DateTimeFormat('en', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(props.note.createdAt)),
)
</script>

<template>
  <ContextMenu>
    <ContextMenuTrigger as-child>
      <Card
          class="group relative min-h-56 cursor-default rounded-lg border-slate-200 bg-white py-0 shadow-xs transition-all duration-200 hover:-translate-y-0.5 hover:border-orange-600/40 hover:shadow-md"
      >
        <CardHeader class="px-5 pt-5 pb-0">
          <div class="flex items-start gap-3">
            <CardTitle class="line-clamp-2 flex-1 pr-8 text-base font-semibold leading-6 text-slate-950">
              {{ note.title }}
            </CardTitle>

            <Button
              type="button"
              variant="ghost"
              size="icon"
              class="absolute right-3 top-3 size-8 rounded-md text-slate-400 hover:bg-orange-50 hover:text-orange-600"
              :aria-label="note.pinned ? 'Unpin note' : 'Pin note'"
              @click.stop="emit('togglePin', note)"
            >
              <Pin
                v-if="note.pinned"
                class="size-4 fill-orange-600 text-orange-600"
              />
              <PinOff
                v-else
                class="size-4"
              />
            </Button>
          </div>
        </CardHeader>

        <CardContent class="flex min-h-38 flex-1 flex-col justify-between gap-5 px-5 pb-5 pt-4">
          <p class="line-clamp-4 text-sm leading-6 text-slate-500">
            {{ note.content }}
          </p>

          <div class="flex items-center justify-between border-t border-slate-100 pt-4 text-xs font-medium text-slate-400">
            <span>{{ createdDate }}</span>
            <span
              v-if="note.pinned"
              class="text-amber-900"
            >
              Pinned
            </span>
          </div>
        </CardContent>
      </Card>
    </ContextMenuTrigger>

    <ContextMenuContent class="w-44">
      <ContextMenuItem @select="emit('share', note)">
        <Send class="size-4" />
        Share
      </ContextMenuItem>

      <ContextMenuItem @select="emit('togglePin', note)">
        <Pin
          v-if="!note.pinned"
          class="size-4"
        />
        <PinOff
          v-else
          class="size-4"
        />
        {{ note.pinned ? 'Unpin' : 'Pin' }}
      </ContextMenuItem>

      <ContextMenuItem @select="emit('duplicate', note)">
        <Copy class="size-4" />
        Duplicate
      </ContextMenuItem>

      <ContextMenuSeparator />

      <ContextMenuItem
        variant="destructive"
        @select="emit('delete', note)"
      >
        <Trash2 class="size-4" />
        Delete
      </ContextMenuItem>
    </ContextMenuContent>
  </ContextMenu>
</template>
