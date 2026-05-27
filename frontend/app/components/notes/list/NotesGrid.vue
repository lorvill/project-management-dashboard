<script setup lang="ts">
import type { Note } from '~~/types/note.types'
import NoteCard from '~/components/notes/list/NoteCard.vue'

defineProps<{
  notes: Note[]
}>()

const emit = defineEmits<{
  share: [note: Note]
  delete: [note: Note]
  'toggle-pin': [note: Note]
  duplicate: [note: Note]
}>()
</script>

<template>
  <div class="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
    <TransitionGroup name="note" tag="div" class="contents">
      <div
          v-for="note in notes"
          :key="note.id"
      >
        <NuxtLink :to="{ name: 'notes-detail', params: { id: note.id } }">
          <NoteCard
              :note="note"
              @share="emit('share', note)"
              @delete="emit('delete', note)"
              @toggle-pin="emit('toggle-pin', note)"
              @duplicate="emit('duplicate', note)"
          />
        </NuxtLink>
      </div>
    </TransitionGroup>
  </div>
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