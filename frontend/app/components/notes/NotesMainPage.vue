<script setup lang="ts">
import type {Note} from '~~/types/note.types'
import NotesToolbar from '~/components/notes/list/NotesToolbar.vue'
import NotesGrid from '~/components/notes/list/NotesGrid.vue'
import NotesGridSkeleton from '~/components/notes/list/NotesGridSkeleton.vue'
import NotesEmptyState from '~/components/notes/list/NotesEmptyState.vue'
import {Button} from '@/components/ui/button'
import {useNoteQuery} from '~/api/notes/queries/all-notes.query'
import {useCreateNoteMutation} from '~/api/notes/mutations/create-note.mutation'
import {Plus} from 'lucide-vue-next'
import {useDeleteNoteMutation} from "~/api/notes/mutations/delete-note.mutation";
import {useRouteQuery} from "@vueuse/router";
import type {NotesFilter, SortOrder} from "~/types/common";

const searchQuery = useRouteQuery<string>('search', '')
const activeFilter = useRouteQuery<NotesFilter>('active', 'all')
const sortOrder = useRouteQuery<SortOrder>('sort', 'newest')

const {data, isPending} = useNoteQuery({
  search: searchQuery,
  active: activeFilter,
  sort: sortOrder,
})

const createNoteMutation = useCreateNoteMutation()
const deleteNoteMutation = useDeleteNoteMutation()

const notes = computed<Note[]>(() =>
    (data.value ?? []).map((note) => ({
      ...note,
      content: note.content ?? null,
      updatedAt: note.updatedAt ?? note.createdAt,
      pinned: false,
    })),
)

const hasNotes = computed(() => notes.value.length > 0)

const handleCreate = () => createNoteMutation.mutate({
  title: '', content: {
    type: 'doc',
    content: [{type: 'paragraph'}],
  }
})
const handleDelete = (note: Note) => deleteNoteMutation.mutate(note.id)

const handleShare = (note: Note) => console.info('Share note', note.id)
const handleTogglePin = (note: Note) => console.info(note.pinned ? 'Unpin' : 'Pin', note.id)
const handleDuplicate = (note: Note) => console.info('Duplicate note', note.id)
const handleRecentlyDeleted = () => console.info('Recently deleted is not implemented yet')
</script>

<template>
  <section class="space-y-7">
    <NotesToolbar
        v-model:search-query="searchQuery"
        v-model:active-filter="activeFilter"
        v-model:sort-order="sortOrder"
        @select-recently-deleted="handleRecentlyDeleted"
    />

    <NotesGridSkeleton v-if="isPending"/>

    <NotesEmptyState
        v-else-if="!hasNotes"
    />

    <NotesGrid
        v-else
        :notes="notes"
        @share="handleShare"
        @delete="handleDelete"
        @toggle-pin="handleTogglePin"
        @duplicate="handleDuplicate"
    />

    <Button
        type="button"
        size="icon"
        class="fixed z-30 size-16 rounded-full bg-orange-600 text-white shadow-lg shadow-orange-600/25 transition-all duration-200 hover:-translate-y-0.5 hover:bg-orange-700 hover:shadow-xl hover:shadow-orange-600/30 focus-visible:ring-3 focus-visible:ring-orange-600/25 md:bottom-10 md:right-15"
        aria-label="Create note"
        @click="handleCreate"
    >
      <Plus class="size-7"/>
    </Button>
  </section>
</template>