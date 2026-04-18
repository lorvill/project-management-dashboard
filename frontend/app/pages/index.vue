<script setup lang="ts">
import {
  ArrowRight,
  CheckCircle2,
  Circle,
  Clock3,
  Ellipsis,
  FolderKanban,
  MessageSquareMore,
  Pause,
  Play,
  Search,
  Sparkles,
  Star,
  UsersRound,
} from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'

definePageMeta({
  name: 'dashboard',
})

interface Project {
  id: number
  name: string
  company: string
  initial: string
  progress: number
  status: string
  priority: string
  done: number
  total: number
  due: string
  accent: string
  surface: string
  tags: string[]
  members: string[]
}

interface Task {
  id: number
  name: string
  done: boolean
  users?: number
  subtasks?: number
}

interface TimerGroup {
  name: string
  initial: string
  accent: string
  items: Array<{
    name: string
    time: string
    active: boolean
  }>
}

const projects: Project[] = [
  {
    id: 1,
    name: 'Google',
    company: 'Google Inc.',
    initial: 'G',
    progress: 50,
    status: 'In Progress',
    priority: 'High',
    done: 25,
    total: 50,
    due: '20 June',
    accent: 'from-blue-500 via-cyan-500 to-emerald-400',
    surface: 'from-blue-50 to-cyan-50',
    tags: ['iOS App', 'UI System'],
    members: ['AL', 'MR', 'DX', 'JP'],
  },
  {
    id: 2,
    name: 'Slack',
    company: 'Slack Corporation',
    initial: 'S',
    progress: 100,
    status: 'Completed',
    priority: 'Medium',
    done: 30,
    total: 30,
    due: '20 June',
    accent: 'from-fuchsia-500 via-rose-500 to-amber-400',
    surface: 'from-rose-50 to-amber-50',
    tags: ['Android', 'Marketing'],
    members: ['ER', 'NO', 'KT', 'FA'],
  },
]

const tasks: Task[] = [
  { id: 1, name: 'Create wireframe', done: false },
  { id: 2, name: 'Slack Logo Design', users: 3, subtasks: 5, done: false },
  { id: 3, name: 'Dashboard Design', subtasks: 5, done: false },
  { id: 4, name: 'Create wireframe', done: true },
  { id: 5, name: 'Google Logo Design', done: true },
  { id: 6, name: 'Slack Logo Design', done: false },
  { id: 7, name: 'Dashboard Design', subtasks: 5, done: false },
]

const timerGroups: TimerGroup[] = [
  {
    name: 'Google',
    initial: 'G',
    accent: 'from-blue-500 to-cyan-400',
    items: [{ name: 'Create Wireframe', time: '25m 20s', active: true }],
  },
  {
    name: 'Slack',
    initial: 'S',
    accent: 'from-fuchsia-500 to-orange-400',
    items: [
      { name: 'Slack logo design', time: '30m 0s', active: false },
      { name: 'Dashboard design', time: '30m 0s', active: false },
      { name: 'Create Wireframe', time: '30m 0s', active: false },
    ],
  },
]

const completedTasks = computed(() => tasks.filter(task => task.done).length)
</script>

<template>
  <section class="space-y-6">
    <div class="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm">
      <div class="px-5 py-5 sm:px-6">
        <div class="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
          <div class="space-y-2">
            <div class="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em]  shadow-sm">
              <Sparkles class="size-3.5" />
              Weekly overview
            </div>
          </div>

          <div class="grid gap-3 sm:grid-cols-3 xl:min-w-105">
            <div class="rounded-2xl border border-white/70 bg-white/80 p-4 shadow-sm backdrop-blur">
              <div class="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                Active projects
              </div>
              <div class="mt-2 text-2xl font-black text-slate-950">
                {{ projects.length }}
              </div>
            </div>
            <div class="rounded-2xl border border-white/70 bg-white/80 p-4 shadow-sm backdrop-blur">
              <div class="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                Tasks done
              </div>
              <div class="mt-2 text-2xl font-black text-slate-950">
                {{ completedTasks }}/{{ tasks.length }}
              </div>
            </div>
          </div>
        </div>

        <div class="mt-5 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div class="relative w-full max-w-xl">
            <Search class="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
            <Input
              default-value=""
              placeholder="Search projects, tasks, teammates"
              class="h-11 rounded-xl border-slate-200 bg-white pl-9 shadow-sm"
            />
          </div>

          <div class="flex flex-wrap items-center gap-2">
            <Button variant="outline" class="rounded-xl border-slate-200 bg-white">
              <FolderKanban class="size-4" />
              All workspaces
            </Button>
            <Button class="rounded-xl bg-slate-950 text-white hover:bg-slate-800">
              <Sparkles class="size-4" />
              New report
            </Button>
          </div>
        </div>
      </div>

      <div class="grid gap-6 p-5 sm:p-6 2xl:grid-cols-[1.1fr_1.2fr_0.9fr]">
        <aside class="space-y-4">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
                Projects
              </p>
              <h2 class="mt-1 text-lg font-bold text-slate-950">
                Priority lanes
              </h2>
            </div>
            <Button size="icon-sm" class="rounded-full bg-slate-950 text-white hover:bg-slate-800">
              <span class="text-base leading-none">+</span>
            </Button>
          </div>

          <article
            v-for="project in projects"
            :key="project.id"
            class="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm"
          >
            <div :class="['bg-linear-to-br p-5', project.surface]">
              <div class="flex items-start justify-between gap-3">
                <div class="flex items-center gap-3">
                  <div :class="['flex size-12 items-center justify-center rounded-2xl bg-linear-to-br text-lg font-black text-white shadow-sm', project.accent]">
                    {{ project.initial }}
                  </div>
                  <div>
                    <h3 class="text-base font-bold text-slate-950">
                      {{ project.name }}
                    </h3>
                    <p class="text-sm text-slate-500">
                      {{ project.company }}
                    </p>
                  </div>
                </div>

                <DropdownMenu>
                  <DropdownMenuTrigger as-child>
                    <Button variant="ghost" size="icon-sm" class="rounded-full text-slate-500 hover:bg-white/80">
                      <Ellipsis class="size-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" class="w-40 rounded-xl">
                    <DropdownMenuItem>Open project</DropdownMenuItem>
                    <DropdownMenuItem>Edit details</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Archive</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <div class="mt-4 flex flex-wrap gap-2">
                <span class="rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-700 shadow-sm">
                  {{ project.status }}
                </span>
                <span class="rounded-full bg-slate-950 px-3 py-1 text-xs font-semibold text-white shadow-sm">
                  {{ project.priority }}
                </span>
              </div>
            </div>

            <div class="space-y-4 p-5">
              <div class="flex items-center justify-between text-sm">
                <span class="text-slate-500">Task done</span>
                <span class="font-semibold text-slate-900">{{ project.done }} / {{ project.total }}</span>
              </div>

              <div class="h-2 overflow-hidden rounded-full bg-slate-100">
                <div :class="['h-full rounded-full bg-linear-to-r', project.accent]" :style="{ width: `${project.progress}%` }" />
              </div>

              <div class="flex flex-wrap gap-2">
                <span
                  v-for="tag in project.tags"
                  :key="tag"
                  class="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-medium text-slate-600"
                >
                  {{ tag }}
                </span>
              </div>

              <Separator />

              <div class="flex items-center justify-between gap-4">
                <div class="flex -space-x-2">
                  <div
                    v-for="member in project.members"
                    :key="member"
                    class="flex size-8 items-center justify-center rounded-full border-2 border-white bg-slate-950 text-[10px] font-bold text-white"
                  >
                    {{ member }}
                  </div>
                  <div class="flex size-8 items-center justify-center rounded-full border-2 border-white bg-slate-100 text-[10px] font-bold text-slate-600">
                    +5
                  </div>
                </div>

                <div class="flex items-center gap-2 text-sm font-medium text-slate-500">
                  <Clock3 class="size-4" />
                  Due {{ project.due }}
                </div>
              </div>
            </div>
          </article>
        </aside>

        <main class="space-y-4">
          <div class="grid gap-4 xl:grid-cols-[1.1fr_0.9fr]">
            <section class="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
              <div class="flex items-center justify-between">
                <div>
                  <p class="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
                    My tasks
                  </p>
                  <h2 class="mt-1 text-lg font-bold text-slate-950">
                    Execution queue
                  </h2>
                </div>
                <div class="rounded-full bg-slate-100 px-3 py-1 text-sm font-semibold text-slate-600">
                  {{ tasks.length.toString().padStart(2, '0') }}
                </div>
              </div>

              <div class="mt-4 space-y-2">
                <div
                  v-for="task in tasks"
                  :key="task.id"
                  class="flex items-center gap-3 rounded-2xl border px-3 py-3 transition-colors"
                  :class="task.done ? 'border-emerald-200 bg-emerald-50/70' : 'border-slate-200 bg-slate-50/60 hover:bg-white'"
                >
                  <div class="w-7 text-xs font-bold tracking-[0.16em] text-slate-400">
                    {{ String(task.id).padStart(2, '0') }}
                  </div>
                  <component
                    :is="task.done ? CheckCircle2 : Circle"
                    :class="task.done ? 'size-4 text-emerald-600' : 'size-4 text-slate-300'"
                  />
                  <div class="min-w-0 flex-1">
                    <div :class="task.done ? 'font-medium text-slate-500 line-through' : 'font-medium text-slate-900'">
                      {{ task.name }}
                    </div>
                  </div>
                  <div class="hidden items-center gap-3 text-xs text-slate-500 sm:flex">
                    <span v-if="task.users" class="inline-flex items-center gap-1">
                      <UsersRound class="size-3.5" />
                      {{ task.users }}
                    </span>
                    <span v-if="task.subtasks" class="inline-flex items-center gap-1">
                      <FolderKanban class="size-3.5" />
                      {{ task.subtasks }}
                    </span>
                  </div>
                </div>
              </div>
            </section>
          </div>

          <section class="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
            <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p class="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
                  Timers
                </p>
                <h2 class="mt-1 text-lg font-bold text-slate-950">
                  Running sessions
                </h2>
              </div>
              <Button variant="outline" class="w-full rounded-xl sm:w-auto">
                <Play class="size-4" />
                Start focus block
              </Button>
            </div>

            <div class="mt-4 grid gap-4 xl:grid-cols-2">
              <div
                v-for="group in timerGroups"
                :key="group.name"
                class="rounded-[22px] border border-slate-200 bg-slate-50/80 p-4"
              >
                <div class="flex items-center justify-between">
                  <div class="flex items-center gap-3">
                    <div :class="['flex size-10 items-center justify-center rounded-2xl bg-linear-to-br text-sm font-black text-white', group.accent]">
                      {{ group.initial }}
                    </div>
                    <div>
                      <div class="font-semibold text-slate-900">
                        {{ group.name }}
                      </div>
                      <div class="text-sm text-slate-500">
                        {{ group.items.length }} tracked sessions
                      </div>
                    </div>
                  </div>

                  <Button variant="ghost" size="icon-sm" class="rounded-full">
                    <Play class="size-4" />
                  </Button>
                </div>

                <div class="mt-3 space-y-2">
                  <div
                    v-for="item in group.items"
                    :key="item.name"
                    class="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-3 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div class="flex items-center gap-3">
                      <div class="flex size-9 items-center justify-center rounded-xl bg-slate-100 text-slate-600">
                        <Clock3 class="size-4" />
                      </div>
                      <div>
                        <div class="font-medium text-slate-900">
                          {{ item.name }}
                        </div>
                        <div class="text-sm text-slate-500">
                          Focus session
                        </div>
                      </div>
                    </div>

                    <div class="flex items-center gap-2">
                      <div class="rounded-full bg-slate-100 px-3 py-1 text-sm font-semibold text-slate-700">
                        {{ item.time }}
                      </div>
                      <Button
                        size="icon-sm"
                        :class="item.active ? 'rounded-full bg-amber-500 text-white hover:bg-amber-400' : 'rounded-full'"
                        :variant="item.active ? 'default' : 'outline'"
                      >
                        <component :is="item.active ? Pause : Play" class="size-4" />
                      </Button>
                      <Button variant="ghost" size="icon-sm" class="rounded-full">
                        <Ellipsis class="size-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>

        <aside class="space-y-4">
          <section class="rounded-3xl border border-slate-200 bg-slate-50 p-4 shadow-sm">
            <div class="mb-4 flex items-center justify-between">
              <div>
                <p class="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
                  Calendar
                </p>
                <h2 class="mt-1 text-lg font-bold text-slate-950">
                  Milestones
                </h2>
              </div>
              <Button variant="ghost" size="icon-sm" class="rounded-full">
                <Star class="size-4 text-amber-500" />
              </Button>
            </div>
            <DashboardAppCalendar />
          </section>

          <section class="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
                  Messages
                </p>
                <h2 class="mt-1 text-lg font-bold text-slate-950">
                  Team inbox
                </h2>
              </div>
              <Button variant="ghost" size="icon-sm" class="rounded-full">
                <MessageSquareMore class="size-4" />
              </Button>
            </div>

          </section>
        </aside>
      </div>
    </div>
  </section>
</template>
