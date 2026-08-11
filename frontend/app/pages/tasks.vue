<script setup lang="ts">
import { provide, ref } from 'vue'
import TasksToolbar from '~/components/tasks/TasksToolbar.vue'
import { Grip, Loader } from "lucide-vue-next";
import {tasksLayoutKey} from "~/utils/tasks/tasks.utils";
import {useRouteQuery} from "@vueuse/router";
import {TaskSort, TaskStatus} from "~/queries/tasks/tasks.dto";

const isCreatingTask = ref(false)

const showNewTaskInput = () => {
  isCreatingTask.value = true
}

const closeNewTaskInput = () => {
  isCreatingTask.value = false
}

const statusFilter = useRouteQuery<TaskStatus>('status') //ref
const sortOrder = useRouteQuery<TaskSort>('sort', TaskSort.NEWEST)
const route = useRoute()
const isChecklist = computed(() => route.name === 'tasks-checklist')

provide(tasksLayoutKey, {
  isCreatingTask,
  showNewTaskInput,
  closeNewTaskInput,
})</script>

<template>
  <section
    class="mt-1 ml-1 min-h-full text-zinc-900"
  >
    <div class="mx-auto max-w-7xl">
      <header class="mb-7">
        <div class="flex items-center gap-3">
          <Grip class="size-5 text-zinc-800" />
          <h1 class="font-bold tracking-tight text-zinc-950 sm:text-2xl">
            Tasks Tracker
          </h1>
        </div>

        <p class="mt-2 text-sm font-medium text-zinc-600 sm:text-base">
          Stay organized with tasks, your way.
        </p>
      </header>

      <TasksToolbar
          v-model:status-filter="statusFilter"
          v-model:sort-order="sortOrder"
          @add-task="showNewTaskInput"
      />

      <div
          v-if="!isChecklist && statusFilter"
          class="mt-4 flex min-h-8 items-center text-sm text-orange-600 pb-2"
      >
        <div
            class="inline-flex items-center gap-1 rounded-lg bg-zinc-100/70 px-2.5 py-1 font-semibold text-orange-500"
        >
          <Loader class="size-4"/>
          <span>status:</span>
          <span>{{ statusFilter.toLowerCase().replaceAll('_', ' ') }}</span>
        </div>
      </div>

    <NuxtPage />
    </div>
  </section>
</template>
