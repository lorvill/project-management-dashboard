<script setup lang="ts">
import type { Note } from '~~/types/note.types'
import NoteCard from '~/components/notes/list/NoteCard.vue'

const props = defineProps<{
  notes: Note[]
}>()

const emit = defineEmits<{
  share: [note: Note]
  delete: [note: Note]
  'toggle-pin': [note: Note]
  duplicate: [note: Note]
}>()

const shouldShiftCards = ref(false)
let shiftTimeout: ReturnType<typeof setTimeout> | undefined

watch(
    () => props.notes.length,
    (current, previous) => {
      if (previous === undefined || current <= previous) return

      shouldShiftCards.value = false
      requestAnimationFrame(() => {
        shouldShiftCards.value = true
      })

      clearTimeout(shiftTimeout)
      shiftTimeout = setTimeout(() => {
        shouldShiftCards.value = false
      }, 220)
    },
)

onBeforeUnmount(() => {
  clearTimeout(shiftTimeout)
})
</script>

<template>
  <div
      class="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4"
      :class="{ 'notes-shift': shouldShiftCards }"
  >
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
  </div>
</template>

<style scoped>
.notes-shift > * {
  animation: notes-shift 200ms ease;
}

@keyframes notes-shift {
  from {
    transform: translateX(-12px);
  }

  to {
    transform: translateX(0);
  }
}
</style>
