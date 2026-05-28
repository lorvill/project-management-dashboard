<script setup lang="ts">
import NotesMainPage from "~/components/notes/NotesMainPage.vue";

definePageMeta({
  name: 'notes',
  middleware: 'auth',
})
</script>

<template>
  <NotesMainPage />
</template>
