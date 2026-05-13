<script setup lang="ts">
import { Skeleton } from '@/components/ui/skeleton'
import {
  Card,
  CardContent,
  CardHeader,
} from '@/components/ui/card'
</script>

<template>
  <section class="space-y-5">
    <Skeleton class="h-9 mt-0 max-w-xl rounded-xl bg-slate-200" />

    <div class="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <Card
          v-for="index in 4"
          :key="index"
          class="relative overflow-hidden h-45 rounded-2xl border-slate-100 bg-white shadow-sm"
      >

        <CardHeader class="space-y-3">
          <Skeleton class="h-5 w-28 rounded-full bg-slate-200" />
          <Skeleton class="h-2 w-37 rounded-xl bg-indigo-100" />
          <Skeleton class="h-2 w-20 rounded-xl bg-slate-100" />
        </CardHeader>
      </Card>
    </div>

    <div class="grid gap-4 xl:grid-cols-[1.6fr_0.6fr_0.6fr]">
      <Card class="relative overflow-hidden rounded-2xl bg-white shadow-sm">
        <CardHeader class="space-y-3">
          <Skeleton class="h-2 w-52 rounded-full bg-slate-100" />
        </CardHeader>

        <CardContent class="space-y-4">
          <div
              v-for="index in 3"
              :key="index"
              class="relative overflow-hidden rounded-2xl border bg-slate-50/80 p-10"
          >
            <div class="absolute inset-x-0 top-0 h-1 bg-linear-to-r " />

            <div class="flex items-start justify-between gap-4">
              <div class="space-y-2">
                <Skeleton class="h-5 w-28 rounded-lg bg-slate-200" />
              </div>

            </div>

            <Skeleton class="mt-4 h-2 w-full rounded-full bg-slate-200" />
          </div>
        </CardContent>
      </Card>

      <Card class="relative overflow-hidden rounded-2xl bg-white shadow-sm">
        <div class="absolute -left-16 -top-16 size-40 rounded-full blur-3xl" />

        <CardHeader class="space-y-3">
          <Skeleton class="h-5 w-44 rounded-full bg-slate-100" />
        </CardHeader>

        <CardContent class="space-y-5">
          <div
              v-for="index in 4"
              :key="index"
              class="flex-col gap-3 rounded-2xl border bg-slate-50/80 p-4 h-23"
          >
            <Skeleton class="h-2 flex-1 mt-2 rounded-full bg-slate-200" />
            <Skeleton class="h-2 flex-1 mt-2 w-26 rounded-full bg-slate-200" />
          </div>
        </CardContent>
      </Card>

      <Card class="relative overflow-hidden rounded-2xl bg-white shadow-sm">
        <div class="absolute -left-16 -top-16 size-40 rounded-full blur-3xl" />

        <CardHeader class="space-y-3">
          <Skeleton class="h-5 w-44 rounded-full bg-slate-100" />
        </CardHeader>

        <CardContent class="space-y-5">
          <div
              v-for="index in 4"
              :key="index"
              class="flex-col gap-3 rounded-2xl border bg-slate-50/80 p-4 h-23"
          >
            <Skeleton class="h-2 flex-1 mt-2 rounded-full bg-slate-200" />
            <Skeleton class="h-2 flex-1 mt-2 w-26 rounded-full bg-slate-200" />
          </div>
        </CardContent>
      </Card>
    </div>
  </section>
</template>
