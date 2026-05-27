<script setup lang="ts">
definePageMeta({
  name: 'notes-detail',
  middleware: 'auth',
})
</script>

<template>
  <ClientOnly>
    <NotesDetailPage />
  </ClientOnly>
</template>
