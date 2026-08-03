<script setup lang="ts">
import {
  MoreVertical,
  Search,
} from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {useNoteQuery} from "~/queries/notes/queries/all-notes.query";
import {getNoteContent} from "~/utils/notes/getNoteContent";
import {useDateFormat, useNow} from "@vueuse/core";
import { getLocalTimeZone, today } from '@internationalized/date'
import type { DateValue } from '@internationalized/date'
import { Calendar } from '@/components/ui/calendar'

const selectedDate = ref<DateValue>(today(getLocalTimeZone()))
const stats = [
  { label: 'Tasks', value: '12' },
  { label: 'Focus', value: '2.5h' },
  { label: 'Notes', value: '8' },
]
const projects = [
  {
    id: 1,
    title: 'Design system',
    deadline: '18 October',
    hours: 84,
    progress: 40,
    members: '+5',
    bg: 'bg-[#f3c2aa]',
  },
  {
    id: 2,
    title: 'Make unique page for customer',
    deadline: '30 October',
    hours: 108,
    progress: 78,
    members: '+2',
    bg: 'bg-[#f7e9b8]',
  },
]
const tasks = [
  {
    id: 1,
    title: 'Finish dashboard layout',
    status: 'In progress',
    assignee: 'test1',
    dueDate: '3030',
    description: 'ffffpfp'
  },
  {
    id: 2,
    title: 'Review project cards',
    status: 'In progress',
    assignee: 'test1',
    dueDate: '3030',
    tag: 'UI',
    time: '12:30',
  },
  {
    id: 3,
    title: 'Update notes section',
    status: 'In progress',
    assignee: 'test1',
    dueDate: '3030',
    tag: 'Notes',
    time: '15:00',
  },
  {
    id: 4,
    title: 'Update notes section',
    status: 'In progress',
    assignee: 'test1',
    dueDate: '3030',
    tag: 'Notes',
    time: '15:00',
  }
]

const getNotes = useNoteQuery({limit: ref(2)})
const notes = computed(() => {
  return (getNotes.data.value?.items ?? [])
})

const date = useDateFormat(useNow(), 'D MMMM', { locales: 'en-US' })
</script>

<template>
  <section class="min-h-auto mt-7 text-slate-950">
    <div class="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_520px]">
      <main class="min-w-0">
        <h1 class="text-4xl font-extrabold">
          Today, {{ date }}
        </h1>

        <div class="relative mt-4 max-w-3xl">
          <Search class="pointer-events-none absolute left-5 top-1/2 size-5 -translate-y-1/2 text-[#c97c54]" />
          <Input
              placeholder="Search tasks and notes"
              class="h-11 rounded-2xl bg-white pl-14 text-base shadow-sm placeholder:text-black-400"
          />
        </div>

        <section class="mt-7">
          <div class="mb-5 flex items-end justify-between">
            <div>
              <h2 class="text-2xl font-bold text-amber-900">
                Recent projects
              </h2>
            </div>

            <Button
                variant="ghost"
                class="text-[#d1845c] hover:bg-transparent hover:text-[#b85e32]"
            >
              View all
            </Button>
          </div>

          <div class="grid gap-5 md:grid-cols-2" v-if="projects.length">
            <article
                v-for="project in projects"
                :key="project.id"
                :class="[
                project.bg,
                'flex min-h-70 flex-col justify-between rounded-[28px] p-6 shadow-sm',
              ]"
            >
              <div>
                <div class="flex items-start justify-between">
                  <div class="flex items-center">
                    <div class="grid size-11 place-items-center rounded-full border border-black/30 bg-white/50 text-sm font-bold">
                      {{ project.members }}
                    </div>
                    <div class="-ml-3 size-9 rounded-full border-2 border-white bg-white/50" />
                    <div class="-ml-3 size-9 rounded-full border-2 border-white bg-white/40" />
                  </div>

                  <Button
                      variant="ghost"
                      size="icon"
                      class="rounded-full hover:bg-white/30"
                  >
                    <MoreVertical class="size-5" />
                  </Button>
                </div>

                <h3 class="mt-12 max-w-65 text-2xl font-bold leading-tight">
                  {{ project.title }}
                </h3>

                <p class="mt-5 text-sm font-medium text-slate-700">
                  Deadline: {{ project.deadline }}
                </p>
              </div>

              <div>
                <div class="mb-3 flex items-center justify-between text-sm font-bold">
                  <span>{{ project.hours }} hours</span>
                  <span>{{ project.progress }}%</span>
                </div>

                <div class="h-3 overflow-hidden rounded-full bg-black/10">
                  <div
                      class="h-full rounded-full bg-slate-950"
                      :style="{ width: `${project.progress}%` }"
                  />
                </div>
              </div>
            </article>
          </div>

          <div v-else class="flex items-center mt-28 justify-center">
            <span class="text-neutral-500 font-light">
              No projects yet
            </span>
          </div>
        </section>

        <section class="mt-8">
          <div class="mb-5 flex items-end justify-between">
            <h2 class="text-2xl font-bold text-amber-900">
              Active tasks
            </h2>

            <Button
                variant="ghost"
                class="text-[#d1845c] hover:bg-transparent hover:text-[#b85e32]"
            >
              View all
            </Button>
          </div>

          <div class="flex flex-col gap-2.5 mt-4">
            <div class="hidden lg:grid lg:grid-cols-[2fr_1fr_1fr_1fr_2fr] px-4 text-[0.8rem] font-medium text-slate-400 gap-3">
              <span>Task name</span>
              <span>Status</span>
              <span>Assignee</span>
              <span>Due date</span>
              <span>Description</span>
            </div>

            <article
                v-if="tasks.length"
                v-for="task in tasks"
                :key="task.id"
                class="bg-white border border-[#e8e1db] rounded-lg px-4 py-2
                       lg:grid lg:grid-cols-[2fr_1fr_1fr_1fr_2fr] lg:items-center lg:gap-4 lg:rounded"
            >
              <p class="text-[0.9rem] font-medium text-[#1e1e1e] mb-2.5 lg:mb-0 lg:font-normal">{{ task.title }}</p>

              <div class="grid grid-cols-2 gap-x-4 sm:grid-cols-3 lg:contents">
                <div class="flex flex-col gap-0.5 lg:contents">
                  <span class="text-[0.7rem] font-semibold uppercase tracking-[0.04em] text-slate-400 lg:hidden">Status</span>
                  <span class="text-[0.85rem] text-slate-500 lg:text-[0.875rem]">{{ task.status }}</span>
                </div>
                <div class="flex flex-col gap-0.5 lg:contents">
                  <span class="text-[0.7rem] font-semibold uppercase tracking-[0.04em] text-slate-400 lg:hidden">Assignee</span>
                  <span class="text-[0.85rem] text-slate-500 lg:text-[0.875rem]">{{ task.assignee }}</span>
                </div>
                <div class="flex flex-col gap-0.5 lg:contents">
                  <span class="text-[0.7rem] font-semibold uppercase tracking-[0.04em] text-slate-400 lg:hidden">Due date</span>
                  <span class="text-[0.85rem] text-slate-500 lg:text-[0.875rem]">{{ task.dueDate }}</span>
                </div>
                <div class="flex flex-col gap-0.5 col-span-2 sm:col-auto lg:contents">
                  <span class="text-[0.7rem] font-semibold uppercase tracking-[0.04em] text-slate-400 lg:hidden">Description</span>
                  <span class="text-[0.85rem] text-slate-500 lg:text-[0.875rem]">{{ task.description }}</span>
                </div>
              </div>
            </article>

            <div v-else class="flex items-center mt-28 justify-center">
            <span class="text-neutral-500 font-light">
              No notes yet
            </span>
              </div>
          </div>
        </section>
      </main>

      <aside class="min-w-0">
        <div class="mb-5 mt-4 flex items-center justify-between pl-6 pr-6 pb-2 pt-3 overflow-hidden rounded-3xl border border-[#eee8e2] bg-white shadow-sm">
          <div
              v-for="stat in stats"
              :key="stat.label"
          >
            <p class="text-sm font-medium text-neutral-400">
              {{ stat.label }}
            </p>

            <p class="mt-2 text-3xl font-">
              {{ stat.value }}
            </p>
          </div>
        </div>

        <div class="flex justify-between items-center">
          <CardContent class="flex px-0 pb-2 pt-3">
            <div class="h-82.5 ">
              <Calendar
                  v-model="selectedDate"
                  class="dashboard-calendar w-75 rounded-xl border border-orange-100 bg-white p-4 shadow-sm"
              />
            </div>
          </CardContent>
          <img
              src="~/assets/images/undraw_starting-work_ifnt.svg"
              class="h-47 w-45 object-contain"
          >
        </div>

        <section class="mt-7">
          <div class="mb-5 flex items-end justify-between">
            <h2 class="text-2xl font-bold text-amber-900">
              Recent notes
            </h2>

            <NuxtLink
                :to="{ name: 'notes' }"
                variant="ghost"
                class="text-[#d1845c] text-sm hover:bg-transparent hover:text-[#b85e32]"
            >
              View all
            </NuxtLink>
          </div>

          <div class="grid gap-6 sm:grid-cols-2" v-if="notes.length">
            <NuxtLink
                :to="{ name: 'notes-detail', params: { id: note.id } }"
                v-for="note in notes"
                :key="note.id"
                class="group flex min-h-55 flex-col rounded-3xl border border-slate-100 bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-xl"
            >
              <div class="flex-1">
                <h2 class="line-clamp-2 text-xl font-bold text-slate-800 border-b border-slate-200 pb-2">
                  {{ note.title }}
                </h2>

                <p class="mt-4 line-clamp-5 text-sm leading-6 text-slate-500">
                  {{ getNoteContent(note.content) }}
                </p>
              </div>

              <div class="mt-6 flex items-center justify-between border-t border-slate-100 pt-4">
                <span class="text-sm text-slate-400">
                  {{ useDateFormat(note.createdAt, 'MMM D, YYYY') }}
                </span>

                <span class="rounded-full bg-amber-50 px-3 py-1 text-xs font-medium text-amber-700">
                  Note
                </span>
              </div>
            </NuxtLink>
          </div>

          <div v-else class="flex items-center mt-28 justify-center">
            <span class="text-neutral-500 font-light">
              No notes yet
            </span>
          </div>
        </section>


      </aside>
    </div>
  </section>
</template>

<style scoped>
.dashboard-calendar :deep(button) {
  cursor: pointer;
}
</style>
