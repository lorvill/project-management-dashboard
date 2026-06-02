<script setup lang="ts">
import {ChevronLeft, ChevronRight} from "lucide-vue-next";

const props = defineProps<{
  currentPage: number
  totalPages: number
  hasNext: boolean
  hasPrev: boolean
}>()

defineEmits<{
  change: [page: number]
}>()

const visiblePages = (current: number, total: number): number[] => {
  const delta = 2
  const pages: number[] = []

  for (
      let i = Math.max(1, current - delta);
      i <= Math.min(total, current + delta);
      i++
  ) {
    pages.push(i)
  }

  return pages
}

const totalPageCount = computed(() => Math.max(props.totalPages, 1))
const activePage = computed(() =>
    Math.min(Math.max(props.currentPage, 1), totalPageCount.value),
)
const pages = computed(() => visiblePages(activePage.value, totalPageCount.value))
const canGoPrev = computed(() => props.hasPrev && activePage.value > 1)
const canGoNext = computed(() => props.hasNext && activePage.value < totalPageCount.value)
</script>

<template>
  <nav class="flex items-center justify-center gap-2" aria-label="Pagination">

    <button
        class="flex size-9 items-center justify-center rounded-full text-sm text-muted-foreground transition-colors hover:bg-slate-200 hover:text-slate-950 disabled:pointer-events-none disabled:opacity-35"
        :disabled="!canGoPrev"
        aria-label="Previous page"
        @click="$emit('change', activePage - 1)"
    >
      <ChevronLeft class="size-4"/>
    </button>

    <template v-if="pages[0]! > 1">
      <button
          class="flex size-9 items-center justify-center rounded-full text-sm text-muted-foreground transition-colors hover:bg-slate-200 hover:text-slate-950 disabled:pointer-events-none disabled:opacity-35"
          @click="$emit('change', 1)"
      >
        1
      </button>
      <span v-if="pages[0]! > 2" class="flex size-9 items-center justify-center text-sm text-muted-foreground">
        …
      </span>
    </template>

    <button
        v-for="page in pages"
        :key="page"
        class="flex size-9 items-center justify-center rounded-full text-sm text-muted-foreground transition-colors hover:bg-slate-200 hover:text-slate-950 disabled:pointer-events-none disabled:opacity-100"
        :class="page === activePage ? 'bg-slate-200 text-slate-950 shadow-sm hover:bg-slate-200' : ''"
        :disabled="page === activePage"
        :aria-current="page === activePage ? 'page' : undefined"
        @click="$emit('change', page)"
    >
      {{ page }}
    </button>

    <template v-if="pages.at(-1)! < totalPageCount">
      <span v-if="pages.at(-1)! < totalPageCount - 1" class="flex size-9 items-center justify-center text-sm text-muted-foreground">
        …
      </span>
      <button
          class="flex size-9 items-center justify-center rounded-full text-sm text-muted-foreground transition-colors hover:bg-slate-200 hover:text-slate-950 disabled:pointer-events-none disabled:opacity-100"
          :disabled="totalPageCount === activePage"
          @click="$emit('change', totalPageCount)"
      >
        {{ totalPageCount }}
      </button>
    </template>

    <button
        class="flex size-9 items-center justify-center rounded-full text-sm text-muted-foreground transition-colors hover:bg-slate-200 hover:text-slate-950 disabled:pointer-events-none disabled:opacity-35"
        :disabled="!canGoNext"
        aria-label="Next page"
        @click="$emit('change', activePage + 1)"
    >
      <ChevronRight class="size-4"/>
    </button>

  </nav>
</template>
