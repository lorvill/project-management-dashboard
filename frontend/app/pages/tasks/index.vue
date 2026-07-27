<script setup lang="ts">
import TasksMainPage from "~/components/tasks/TasksMainPage.vue";

definePageMeta({
  name: 'tasks',
  middleware: 'auth',
})
</script>

<template>
  <tasks-main-page />
</template>
