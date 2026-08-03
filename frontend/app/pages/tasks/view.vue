<script setup lang="ts">
import TasksByStatus from "~/components/tasks/views/by-status/TasksByStatus.vue";

definePageMeta({
  name: 'tasks-by-status',
  layout: 'tasks',
  middleware: 'auth',
})
</script>

<template>
  <TasksByStatus />
</template>