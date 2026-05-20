<script setup lang="ts">
import type { Note } from '~~/types/note.types'
import NotesToolbar from '~/components/notes/NotesToolbar.vue'
import NoteCard from '~/components/notes/NoteCard.vue'
import NoteCardCreation from '../../components/notes/NoteCardCreation.vue'
import { useNoteQuery } from '~/api/notes/queries/all-notes.query'
import { useCreateNoteMutation } from '~/api/notes/mutations/create-note.mutation'

definePageMeta({
  name: 'notes',
  middleware: 'auth',
})

type NotesFilter = 'all' | 'pinned'
type SortOrder = 'newest' | 'oldest'

const searchQuery = ref('')
const activeFilter = ref<NotesFilter>('all')
const sortOrder = ref<SortOrder>('newest')

const { data } = useNoteQuery()
const createNoteMutation = useCreateNoteMutation()

const notes = computed<Note[]>(() =>
    (data.value ?? []).map((note) => ({
      ...note,
      content: note.content ?? '',
      pinned: false,
    })),
)

const filteredNotes = computed(() => {
  const normalizedQuery = searchQuery.value.trim().toLowerCase()

  return notes.value
      .filter((note) => activeFilter.value === 'all' || note.pinned)
      .filter((note) => {
        if (!normalizedQuery) return true

        return `${note.title} ${note.content}`.toLowerCase().includes(normalizedQuery)
      })
      .sort((currentNote, nextNote) => {
        const currentDate = new Date(currentNote.createdAt).getTime()
        const nextDate = new Date(nextNote.createdAt).getTime()

        return sortOrder.value === 'newest'
            ? nextDate - currentDate
            : currentDate - nextDate
      })
})

const handleShare = (note: Note) => {
  console.info('Share note', note.id)
}

const handleDelete = (note: Note) => {
  console.info('Delete note', note.id)
}

const handleTogglePin = (note: Note) => {
  console.info(note.pinned ? 'Unpin note' : 'Pin note', note.id)
}

const handleDuplicate = (note: Note) => {
  console.info('Duplicate note', note.id)
}

const handleCreate = () => {
  createNoteMutation.mutate({
    title: 'Untitled',
    content: '',
  })
}

const handleRecentlyDeleted = () => {
  console.info('Recently deleted is not implemented yet')
}
</script>

<template>
  <section class="space-y-7">
    <NotesToolbar
        v-model:search-query="searchQuery"
        v-model:active-filter="activeFilter"
        v-model:sort-order="sortOrder"
        @select-recently-deleted="handleRecentlyDeleted"
    />

    <div class="grid grid-cols-2 gap-4 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
      <NoteCardCreation @create="handleCreate" />

      <TransitionGroup name="note" tag="div" class="contents">
        <div
            v-for="note in filteredNotes"
            :key="note.id"
        >
          <NoteCard
              :note="note"
              @share="handleShare"
              @delete="handleDelete"
              @toggle-pin="handleTogglePin"
              @duplicate="handleDuplicate"
          />
        </div>
      </TransitionGroup>
    </div>
  </section>
</template>

<style scoped>
.note-enter-active,
.note-leave-active,
.note-move {
  transition: all 249ms ease;
}

.note-enter-from {
  opacity: 0;
  transform: translateX(39px);
}

.note-enter-to {
  opacity: 1;
  transform: translateX(0);
}

.note-leave-to {
  opacity: 0;
  transform: translateX(39px);
}
</style>
