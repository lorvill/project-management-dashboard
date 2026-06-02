<script setup lang="ts">
import { Check, ChevronDown, Search } from 'lucide-vue-next'
import { Input } from '@/components/ui/input'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

type NotesFilter = 'all' | 'pinned'
type SortOrder = 'newest' | 'oldest'

const searchQuery = defineModel<string>('searchQuery', { required: true })
const activeFilter = defineModel<NotesFilter>('activeFilter', { required: true })
const sortOrder = defineModel<SortOrder>('sortOrder', { required: true })

const emit = defineEmits<{
  'selectRecentlyDeleted': []
}>()

const filterLabels: Record<NotesFilter, string> = {
  all: 'All notes',
  pinned: 'Pinned',
}

const sortLabels: Record<SortOrder, string> = {
  newest: 'Newest',
  oldest: 'Oldest',
}

const activeFilterLabel = computed(() => filterLabels[activeFilter.value])
const activeSortLabel = computed(() => sortLabels[sortOrder.value])
</script>

<template>
  <div class="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
    <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-5">
      <DropdownMenu>
        <DropdownMenuTrigger as-child>
          <button
            type="button"
            class="group inline-flex w-fit items-center gap-1 rounded-md text-left text-2xl font-bold tracking-tight text-slate-950 outline-none transition-colors hover:text-amber-900 focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2"
            aria-label="Select notes filter"
          >
            <span>{{ activeFilterLabel }}</span>
            <ChevronDown class="mt-1 size-5 text-slate-500 transition-colors group-hover:text-amber-900 group-data-[state=open]:text-amber-900" />
          </button>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          align="start"
          :side-offset="8"
          class="w-52 rounded-2xl border border-slate-200 bg-white/90 p-1.5 shadow-xl ring-1 ring-black/5 backdrop-blur-md"
        >
          <DropdownMenuItem
            class="flex cursor-pointer items-center justify-between rounded-lg px-3 py-2 text-sm font-medium text-slate-600 outline-none transition-colors hover:bg-amber-50 hover:text-amber-600"
            @select="activeFilter = 'all'"
          >
            <span>All notes</span>
            <Check v-if="activeFilter === 'all'" class="size-4 text-amber-500" />
          </DropdownMenuItem>

          <DropdownMenuItem
            class="flex cursor-pointer items-center justify-between rounded-lg px-3 py-2 text-sm font-medium text-slate-600 outline-none transition-colors hover:bg-amber-50 hover:text-amber-600"
            @select="activeFilter = 'pinned'"
          >
            <span>Pinned</span>
            <Check v-if="activeFilter === 'pinned'" class="size-4 text-amber-500" />
          </DropdownMenuItem>

          <DropdownMenuItem
            class="flex cursor-pointer items-center rounded-lg px-3 py-2 text-sm font-medium text-slate-600 outline-none transition-colors hover:bg-amber-50 hover:text-amber-600"
            @select="emit('selectRecentlyDeleted')"
          >
            Recently deleted
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>


    </div>

    <div class="flex flex-col gap-3 sm:flex-row sm:items-center">
      <div class="relative sm:w-72">
        <Search class="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />

        <Input
          placeholder="Search notes"
          class="h-10 rounded-full border border-slate-200 bg-white pl-9 pr-10 shadow-xs transition-all placeholder:text-slate-400 focus-visible:border-orange-600 focus-visible:ring-3 focus-visible:ring-orange-600/15"
          v-model="searchQuery"
        />

        <kbd class="pointer-events-none absolute right-3 top-1/2 hidden -translate-y-1/2 rounded border border-slate-200 bg-slate-50 px-1.5 py-0.5 text-[10px] font-medium leading-none text-slate-400 sm:inline-flex">
          /
        </kbd>
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger as-child>
          <button
            type="button"
            class="group inline-flex h-10 min-w-28 items-center justify-between gap-2 rounded-full border border-slate-200 bg-white px-3.5 text-sm font-medium text-slate-700 shadow-xs outline-none transition-colors hover:border-orange-200 hover:bg-orange-50/60 hover:text-orange-700 focus-visible:border-orange-300 focus-visible:ring-3 focus-visible:ring-orange-600/15"
            aria-label="Sort by"
          >
            <span>{{ activeSortLabel }}</span>
            <ChevronDown class="size-4 text-slate-400 transition-colors group-hover:text-amber-500 group-data-[state=open]:text-amber-500" />
          </button>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          align="end"
          :side-offset="8"
          class="w-44 rounded-2xl border border-slate-200 bg-white/90 p-1.5 shadow-xl ring-1 ring-black/5 backdrop-blur-md"
        >
          <DropdownMenuItem
            class="flex cursor-pointer items-center justify-between rounded-lg px-3 py-2 text-sm font-medium text-slate-600 outline-none transition-colors hover:bg-amber-50 hover:text-amber-600"
            @select="sortOrder = 'newest'"
          >
            <span>Newest</span>
            <Check v-if="sortOrder === 'newest'" class="size-4 text-amber-500" />
          </DropdownMenuItem>

          <DropdownMenuItem
            class="flex cursor-pointer items-center justify-between rounded-lg px-3 py-2 text-sm font-medium text-slate-600 outline-none transition-colors hover:bg-amber-50 hover:text-amber-600"
            @select="sortOrder = 'oldest'"
          >
            <span>Oldest</span>
            <Check v-if="sortOrder === 'oldest'" class="size-4 text-amber-500" />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  </div>
</template>
