<script setup lang="ts">
import { ChevronLeft, ChevronRight } from "lucide-vue-next"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "~/components/ui/pagination"

const currentPage = defineModel<number>("page", {
  required: true,
})

const props = defineProps<{
  totalPages: number
}>()

const totalPageCount = computed(() => Math.max(props.totalPages, 1))

const activePage = computed(() =>
    Math.min(Math.max(currentPage.value, 1), totalPageCount.value),
)
</script>

<template>
  <Pagination
      v-slot="{ page: selectedPage }"
      :page="activePage"
      :total="totalPageCount"
      :items-per-page="1"
      :sibling-count="2"
      show-edges
      class="w-auto"
      @update:page="currentPage = $event"
  >
    <PaginationContent
        v-slot="{ items }"
        class="gap-1 rounded-full border border-slate-200/80 bg-white/95 p-1 shadow-sm backdrop-blur"
    >
      <PaginationPrevious
          size="icon"
          class="size-9 rounded-full text-slate-500 hover:bg-slate-100 hover:text-slate-950 disabled:opacity-35"
          aria-label="Previous page"
      >
        <ChevronLeft class="size-4"/>
      </PaginationPrevious>

      <template v-for="(item, index) in items" :key="index">
        <PaginationItem
            v-if="item.type === 'page'"
            :value="item.value"
            :is-active="item.value === selectedPage"
            size="icon"
            class="size-9 rounded-full text-sm"
            :class="item.value === selectedPage
              ? 'border-slate-950 bg-slate-950 text-white shadow-sm hover:bg-slate-950 hover:text-white'
              : 'text-slate-600 hover:bg-slate-100 hover:text-slate-950'"
        >
          {{ item.value }}
        </PaginationItem>

        <PaginationEllipsis
            v-else
            :index="index"
            class="size-9 text-slate-400"
        />
      </template>

      <PaginationNext
          size="icon"
          class="size-9 rounded-full text-slate-500 hover:bg-slate-100 hover:text-slate-950 disabled:opacity-35"
          aria-label="Next page"
      >
        <ChevronRight class="size-4"/>
      </PaginationNext>
    </PaginationContent>
  </Pagination>
</template>
