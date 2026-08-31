<script setup lang="ts">
import TasksAll from '~/components/tasks/views/all-tasks/TasksAll.vue'

definePageMeta({
  middleware: 'auth',
})
</script>

<template>
  <TasksAll />
</template>
