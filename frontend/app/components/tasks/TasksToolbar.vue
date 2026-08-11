<script setup lang="ts">
import {
  ArrowDownUp,
  CircleDot,
  Filter,
  ListChecks,
  Plus,
  Search,
  Star,
} from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {TaskSort, TaskStatus} from "~/queries/tasks/tasks.dto";

const route = useRoute()
const views = computed(() =>
  [
    { name: 'All Tasks', icon: Star, to: { name: 'tasks', query: route.query } },
    { name: 'By Status', icon: CircleDot, to: { name: 'tasks-by-status', query: route.query } },
    { name: 'Checklist', icon: ListChecks, to: { name: 'tasks-checklist', query: route.query } },
  ]
)

const tooltipClass =
    'rounded-md bg-zinc-900 px-2.5 py-1.5 text-xs font-medium text-zinc-50 shadow-md ' +
    'data-[state=delayed-open]:data-[side=top]:animate-slideDownAndFade ' +
    'data-[state=delayed-open]:data-[side=bottom]:animate-slideUpAndFade'

const statusFilter = defineModel<TaskStatus | undefined>('statusFilter', { required: true })
const sortOrder = defineModel<TaskSort>('sortOrder', { required: true })

const emit = defineEmits<{
  (e: 'addTask'): void
}>()
</script>

<template>
  <div class="mb-4 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
    <div class="flex flex-wrap items-center gap-2">
      <NuxtLink
          v-for="view in views"
          :key="view.name"
          :to="view.to"
          class="inline-flex h-9 items-center gap-2 rounded-full px-3 text-sm font-semibold transition-all duration-200"
          :class="route.name === view.to?.name
            ? 'bg-zinc-100 text-zinc-950'
            : 'text-zinc-700 hover:bg-zinc-50'"
      >
        <component :is="view.icon" class="size-4" />
        {{ view.name }}
      </NuxtLink>
    </div>

    <div class="flex items-center justify-between gap-2 sm:justify-end">
      <TooltipProvider :delay-duration="300">
        <div class="flex items-center gap-1">
          <Button
              type="button"
              class="flex items-center gap-2 rounded-lg p-2 text-sm font-medium bg-orange-600 text-white shadow-lg shadow-orange-600/25 transition-all duration-200 hover:-translate-y-0.5 hover:bg-orange-700 hover:shadow-xl hover:shadow-orange-600/30 focus-visible:ring-3 focus-visible:ring-orange-600/25 md:bottom-10 md:right-15"
              @click="emit('addTask')"
          >
            <Plus class="size-4" />
            New task
          </Button>

          <Tooltip>
            <TooltipTrigger as-child>
              <span class="inline-flex">
                <DropdownMenu>
                  <DropdownMenuTrigger as-child>
                    <Button
                        type="button"
                        variant="ghost"
                        size="icon-sm"
                        class="text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900 data-[state=open]:bg-zinc-100 data-[state=open]:text-zinc-900"
                        aria-label="Filter"
                    >
                      <Filter class="size-4" />
                    </Button>
                  </DropdownMenuTrigger>

                  <DropdownMenuContent
                      align="end"
                      :side-offset="8"
                      class="w-44 rounded-xl border border-zinc-200 bg-white p-1.5 shadow-lg"
                  >
                    <DropdownMenuItem
                        @select="statusFilter = undefined"
                        class="gap-2.5 rounded-lg px-3 py-2 text-sm font-medium text-zinc-700 cursor-pointer focus:bg-zinc-100 focus:text-zinc-950">
                      <span class="size-2.5 rounded-full bg-zinc-400" />
                      All
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        @select="statusFilter = TaskStatus.NOT_STARTED"
                        class="gap-2.5 rounded-lg px-3 py-2 text-sm font-medium text-zinc-700 cursor-pointer focus:bg-zinc-100 focus:text-zinc-950">
                      <span class="size-2.5 rounded-full border-2 border-zinc-400" />
                      Not started
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        @select="statusFilter = TaskStatus.IN_PROGRESS"
                        class="gap-2.5 rounded-lg px-3 py-2 text-sm font-medium text-zinc-700 cursor-pointer focus:bg-blue-50 focus:text-blue-700">
                      <span class="size-2.5 rounded-full bg-blue-500" />
                      In progress
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        @select="statusFilter = TaskStatus.DONE"
                        class="gap-2.5 rounded-lg px-3 py-2 text-sm font-medium text-zinc-700 cursor-pointer focus:bg-emerald-50 focus:text-emerald-700">
                      <span class="size-2.5 rounded-full bg-emerald-500" />
                      Done
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </span>
            </TooltipTrigger>
            <TooltipContent :side-offset="2" :class="tooltipClass">
              Filter by
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger as-child>
              <span class="inline-flex">
                <DropdownMenu>
                  <DropdownMenuTrigger as-child>
                    <Button
                        type="button"
                        variant="ghost"
                        size="icon-sm"
                        class="text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900 data-[state=open]:bg-zinc-100 data-[state=open]:text-zinc-900"
                        aria-label="Filter"
                    >
                      <ArrowDownUp class="size-4" />
                    </Button>
                  </DropdownMenuTrigger>

                  <DropdownMenuContent
                      align="end"
                      :side-offset="8"
                      class="w-44 rounded-xl border border-zinc-200 bg-white p-1.5 shadow-lg"
                  >
                    <DropdownMenuItem
                        @select="sortOrder = TaskSort.NEWEST"
                        class="gap-2.5 rounded-lg px-3 py-2 text-sm font-medium text-zinc-700 cursor-pointer focus:bg-zinc-100 focus:text-zinc-950">
                      Newest
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        @select="sortOrder = TaskSort.OLDEST"
                        class="gap-2.5 rounded-lg px-3 py-2 text-sm font-medium text-zinc-700 cursor-pointer focus:bg-zinc-100 focus:text-zinc-950">
                      Oldest
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </span>
            </TooltipTrigger>
            <TooltipContent :side-offset="2" :class="tooltipClass">
              Sort
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger as-child>
              <Button
                  type="button"
                  variant="ghost"
                  size="icon-sm"
                  class="text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900"
                  aria-label="Search"
              >
                <Search class="size-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent :side-offset="2" :class="tooltipClass">
              Search
            </TooltipContent>
          </Tooltip>
        </div>
      </TooltipProvider>
    </div>
  </div>
</template>
