<script setup lang="ts">
import TasksChecklist from "~/components/tasks/views/checklist/TasksChecklist.vue";

definePageMeta({
  middleware: 'auth',
})
</script>

<template>
  <TasksChecklist />
</template>