<script setup lang="ts">
import type { Note } from '~~/types/note.types'
import NotesToolbar from '~/components/notes/NotesToolbar.vue'
import NotesGrid from '~/components/notes/NotesGrid.vue'
import NotesGridSkeleton from '~/components/notes/NotesGridSkeleton.vue'
import NotesEmptyState from '~/components/notes/NotesEmptyState.vue'
import { Button } from '@/components/ui/button'
import { useNoteQuery } from '~/api/notes/queries/all-notes.query'
import { useCreateNoteMutation } from '~/api/notes/mutations/create-note.mutation'
import { Plus } from 'lucide-vue-next'
import {useDeleteNoteMutation} from "~/api/notes/mutations/delete-note.mutation";

type NotesFilter = 'all' | 'pinned'
type SortOrder = 'newest' | 'oldest'

const searchQuery = ref('')
const activeFilter = ref<NotesFilter>('all')
const sortOrder = ref<SortOrder>('newest')

const { data, isPending, status, refetch } = useNoteQuery()
const createNoteMutation = useCreateNoteMutation()
const deleteNoteMutation = useDeleteNoteMutation()

const notes = computed<Note[]>(() =>
    (data.value ?? []).map((note) => ({
      ...note,
      content: note.content ?? '',
      updatedAt: note.updatedAt ?? note.createdAt,
      pinned: false,
    })),
)

const filteredNotes = computed(() => {
  const query = searchQuery.value.trim().toLowerCase()

  return notes.value
      .filter((note) => activeFilter.value === 'all' || note.pinned)
      .filter((note) => !query || `${note.title} ${note.content}`.toLowerCase().includes(query))
      .sort((a, b) => {
        const dir = sortOrder.value === 'newest' ? -1 : 1
        return a.createdAt < b.createdAt ? dir : -dir
      })
})

const hasNotes = computed(() => notes.value.length > 0)
const hasFilteredNotes = computed(() => filteredNotes.value.length > 0)

const handleCreate = () => createNoteMutation.mutate({ title: '', content: '' })
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

    <NotesGridSkeleton v-if="isPending" />

    <NotesEmptyState
        v-else-if="status === 'error'"
        title="Failed to load notes"
        description="Something went wrong while loading your notes. Try refreshing the list."
        action-label="Retry"
        @action="refetch()"
    />

    <NotesEmptyState
        v-else-if="!hasNotes"
        title="No notes yet"
        description="Create your first note to keep ideas, tasks, and useful details in one place."
        action-label="Create note"
        @action="handleCreate"
    />

    <NotesGrid
        v-else
        :notes="filteredNotes"
        @share="handleShare"
        @delete="handleDelete"
        @toggle-pin="handleTogglePin"
        @duplicate="handleDuplicate"
    />

    <NotesEmptyState
        v-if="hasNotes && !hasFilteredNotes"
        size="sm"
        title="No matching notes"
        description="Try adjusting your search or filter."
    />

    <Button
        type="button"
        size="icon"
        class="fixed z-30 size-16 rounded-full bg-orange-600 text-white shadow-lg shadow-orange-600/25 transition-all duration-200 hover:-translate-y-0.5 hover:bg-orange-700 hover:shadow-xl hover:shadow-orange-600/30 focus-visible:ring-3 focus-visible:ring-orange-600/25 md:bottom-10 md:right-15"
        aria-label="Create note"
        @click="handleCreate"
    >
      <Plus class="size-7" />
    </Button>
  </section>
</template>