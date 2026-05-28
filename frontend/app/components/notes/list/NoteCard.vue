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
import {getNoteContent} from "~/utils/notes/getNoteContent";

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

const updatedDate = computed(() =>
  new Intl.DateTimeFormat('en', {
    month: 'short',
    day: 'numeric',
  }).format(new Date(props.note.updatedAt)),
)

const noteText = computed(() => getNoteContent(props.note.content))
const notePreview = computed(() => noteText.value || 'No additional text')
</script>

<template>
  <ContextMenu>
    <ContextMenuTrigger as-child>
      <Card
          class="group relative min-h-44 cursor-default rounded-lg border-slate-200 bg-white py-0 shadow-xs transition-all duration-200 ease-out hover:-translate-y-1 hover:border-orange-600/40 hover:shadow-lg hover:shadow-slate-200/70"
      >
        <CardHeader class="px-4 pt-4 pb-0">
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

        <CardContent class="flex flex-1 flex-col justify-between gap-4 px-4 pb-4 pt-3">
          <p
            class="line-clamp-3 min-h-15 text-sm leading-5 text-slate-500"
            :class="{ 'text-slate-400': !note.content }"
          >
            {{ notePreview }}
          </p>

          <div class="flex justify-between items-center gap-3 border-t border-slate-100 pt-3">
            <div class="min-w-0 text-xs font-medium text-slate-400">
              <span>{{ createdDate }}</span>
              <span class="flex text-slate-300">last updated on {{ updatedDate }}</span>
            </div>

            <div class="flex shrink-0 items-center gap-1 opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-within:opacity-100">
              <Button
                type="button"
                variant="ghost"
                size="icon"
                class="size-7 rounded-md text-slate-400 hover:bg-orange-50 hover:text-orange-600"
                aria-label="Share note"
                @click.stop="emit('share', note)"
              >
                <Send class="size-3.5" />
              </Button>

              <Button
                type="button"
                variant="ghost"
                size="icon"
                class="size-7 rounded-md text-slate-400 hover:bg-orange-50 hover:text-orange-600"
                aria-label="Duplicate note"
                @click.stop="emit('duplicate', note)"
              >
                <Copy class="size-3.5" />
              </Button>

              <Button
                type="button"
                variant="ghost"
                size="icon"
                class="size-7 rounded-md text-slate-400 hover:bg-red-50 hover:text-red-600"
                aria-label="Delete note"
                @click.stop="emit('delete', note)"
              >
                <Trash2 class="size-3.5" />
              </Button>
            </div>
          </div>

        </CardContent>
      </Card>
    </ContextMenuTrigger>

    <ContextMenuContent
      class="w-48 rounded-lg border border-slate-200 bg-white p-1.5 text-slate-700 shadow-xl shadow-slate-200/70 ring-1 ring-black/5"
    >
      <ContextMenuItem
        class="cursor-pointer rounded-md px-2.5 py-2 text-sm font-medium outline-none transition-colors hover:bg-slate-100 hover:text-slate-950 focus:bg-slate-100 focus:text-slate-950 data-highlighted:bg-slate-100 data-highlighted:text-slate-950"
        @select="emit('share', note)"
      >
        <Send class="size-4 text-slate-500" />
        Share
      </ContextMenuItem>

      <ContextMenuItem
        class="cursor-pointer rounded-md px-2.5 py-2 text-sm font-medium outline-none transition-colors hover:bg-slate-100 hover:text-slate-950 focus:bg-slate-100 focus:text-slate-950 data-highlighted:bg-slate-100 data-highlighted:text-slate-950"
        @select="emit('togglePin', note)"
      >
        <Pin
          v-if="!note.pinned"
          class="size-4 text-slate-500"
        />
        <PinOff
          v-else
          class="size-4 text-slate-500"
        />
        {{ note.pinned ? 'Unpin' : 'Pin' }}
      </ContextMenuItem>

      <ContextMenuItem
        class="cursor-pointer rounded-md px-2.5 py-2 text-sm font-medium outline-none transition-colors hover:bg-slate-100 hover:text-slate-950 focus:bg-slate-100 focus:text-slate-950 data-highlighted:bg-slate-100 data-highlighted:text-slate-950"
        @select="emit('duplicate', note)"
      >
        <Copy class="size-4 text-slate-500" />
        Duplicate
      </ContextMenuItem>

      <ContextMenuSeparator class="my-1 bg-slate-100" />

      <ContextMenuItem
        variant="destructive"
        class="cursor-pointer rounded-md px-2.5 py-2 text-sm font-medium text-red-600 outline-none transition-colors hover:bg-red-50 hover:text-red-700 focus:bg-red-50 focus:text-red-700 data-highlighted:bg-red-50 data-highlighted:text-red-700"
        @select="emit('delete', note)"
      >
        <Trash2 class="size-4" />
        Delete
      </ContextMenuItem>
    </ContextMenuContent>
  </ContextMenu>
</template>
