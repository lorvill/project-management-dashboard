<script setup lang="ts">
import TasksByStatus from "~/components/tasks/views/by-status/TasksByStatus.vue";

definePageMeta({
  middleware: 'auth',
})
</script>

<template>
  <TasksByStatus />
</template>