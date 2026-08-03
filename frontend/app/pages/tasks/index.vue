<script setup lang="ts">
import TasksAll from '~/components/tasks/views/all-tasks/TasksAll.vue'

definePageMeta({
  name: 'tasks',
  layout: 'tasks',
  middleware: 'auth',
})
</script>

<template>
  <TasksAll />
</template>
