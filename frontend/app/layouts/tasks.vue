<script setup lang="ts">
import { provide, ref } from 'vue'
import TasksToolbar from '~/components/tasks/TasksToolbar.vue'
import { Sparkles } from "lucide-vue-next";
import {tasksLayoutKey} from "~/utils/tasks/tasks.utils";

const isCreatingTask = ref(false)

const showNewTaskInput = () => {
  isCreatingTask.value = true
}

const closeNewTaskInput = () => {
  isCreatingTask.value = false
}

provide(tasksLayoutKey, {
  isCreatingTask,
  showNewTaskInput,
  closeNewTaskInput,
})</script>

<template>
  <NuxtLayout name="default">
    <section class="mt-1 ml-1 min-h-full text-zinc-900">
      <div class="mx-auto max-w-7xl">
        <header class="mb-7">
          <div class="flex items-center gap-3">
            <Sparkles class="size-5 text-zinc-800" />
            <h1 class="font-bold tracking-tight text-zinc-950 sm:text-2xl">
              Tasks Tracker
            </h1>
          </div>

          <p class="mt-2 text-sm font-medium text-zinc-600 sm:text-base">
            Stay organized with tasks, your way.
          </p>
        </header>

        <TasksToolbar @add-task="showNewTaskInput" />

        <slot />
      </div>
    </section>
  </NuxtLayout>
</template>
