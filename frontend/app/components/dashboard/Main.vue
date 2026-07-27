<script setup lang="ts">
import {
  CheckCircle2,
  Circle,
  Clock3,
  FolderKanban,
  Search,
  Sparkles,
} from 'lucide-vue-next'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

import { useDashboardQuery } from '../../queries/dashboard/dashboard.fakequeries'

const { dashboardQuery } = useDashboardQuery()

const dashboard = computed(() => dashboardQuery.data.value)
</script>

<template>
  <section class="space-y-6">
    <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <div class="mb-2 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
          <Sparkles class="size-3.5" />
          Weekly overview
        </div>

        <h1 class="text-2xl font-bold tracking-tight text-slate-950">
          Dashboard
        </h1>

        <p class="mt-1 text-sm text-slate-500">
          Your projects, tasks and active work sessions.
        </p>
      </div>

      <Button class="rounded-xl">
        <Sparkles class="size-4" />
        New report
      </Button>
    </div>

    <div class="relative max-w-xl">
      <Search class="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />

      <Input
          placeholder="Search projects, tasks, teammates"
          class="h-11 rounded-xl pl-9"
      />
    </div>


    <template v-if="dashboard">
      <div class="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Card>
          <CardHeader class="pb-2">
            <CardDescription>Active projects</CardDescription>
            <CardTitle class="text-3xl">
              {{ dashboard.summary.activeProjects }}
            </CardTitle>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader class="pb-2">
            <CardDescription>Tasks done</CardDescription>
            <CardTitle class="text-3xl">
              {{ dashboard.summary.completedTasks }}/{{ dashboard.summary.totalTasks }}
            </CardTitle>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader class="pb-2">
            <CardDescription>Running timers</CardDescription>
            <CardTitle class="text-3xl">
              {{ dashboard.summary.runningTimers }}
            </CardTitle>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader class="pb-2">
            <CardDescription>Progress</CardDescription>
            <CardTitle class="text-3xl">
              {{
                Math.round(
                    (dashboard.summary.completedTasks / dashboard.summary.totalTasks) * 100
                )
              }}%
            </CardTitle>
          </CardHeader>
        </Card>
      </div>

      <div class="grid gap-4 xl:grid-cols-[1fr_1fr]">
        <Card>
          <CardHeader>
            <CardTitle class="flex items-center gap-2">
              <FolderKanban class="size-5" />
              Projects
            </CardTitle>
            <CardDescription>
              Current project progress
            </CardDescription>
          </CardHeader>

          <CardContent class="space-y-4">
            <div
                v-for="project in dashboard.projects"
                :key="project.id"
                class="space-y-3 rounded-2xl border p-4"
            >
              <div class="flex items-start justify-between gap-3">
                <div>
                  <div class="font-semibold text-slate-950">
                    {{ project.name }}
                  </div>

                  <div class="text-sm text-slate-500">
                    {{ project.company }}
                  </div>
                </div>

                <Badge variant="secondary">
                  {{ project.status }}
                </Badge>
              </div>

              <Progress :model-value="project.progress" />

              <div class="text-sm text-slate-500">
                {{ project.progress }}% completed
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle class="flex items-center gap-2">
              <Clock3 class="size-5" />
              Tasks
            </CardTitle>
            <CardDescription>
              Your latest tasks
            </CardDescription>
          </CardHeader>

          <CardContent class="space-y-2">
            <div
                v-for="task in dashboard.tasks"
                :key="task.id"
                class="flex items-center gap-3 rounded-2xl border p-3"
            >
              <component
                  :is="task.done ? CheckCircle2 : Circle"
                  :class="task.done ? 'size-4 text-emerald-600' : 'size-4 text-slate-300'"
              />

              <span
                  :class="task.done ? 'text-sm text-slate-400 line-through' : 'text-sm font-medium text-slate-900'"
              >
                {{ task.title }}
              </span>
            </div>
          </CardContent>
        </Card>
      </div>
    </template>

    <Card v-else>
      <CardHeader>
        <CardTitle>No dashboard data</CardTitle>
        <CardDescription>
          Dashboard information will appear here after the server responds.
        </CardDescription>
      </CardHeader>
    </Card>
  </section>
</template>