<script setup lang="ts">
import { Card } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
</script>

<template>
  <div class="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
    <Card
        v-for="index in 8"
        :key="index"
        class="min-h-44 rounded-lg border-slate-200 bg-white px-4 py-4 shadow-xs"
    >
      <Skeleton class="h-5 w-3/4 bg-slate-200" />

      <div class="space-y-2">
        <Skeleton class="h-4 w-full bg-slate-100" />
        <Skeleton class="h-4 w-5/6 bg-slate-100" />
        <Skeleton class="h-4 w-2/3 bg-slate-100" />
      </div>

      <div class="mt-auto flex items-center justify-between border-t border-slate-100 pt-3">
        <Skeleton class="h-3 w-24 bg-slate-100" />
        <Skeleton class="h-7 w-20 rounded-md bg-slate-100" />
      </div>
    </Card>
  </div>
</template>