<script setup lang="ts">
import type { DateValue } from '@internationalized/date'
import { CalendarDate, fromDate, getLocalTimeZone } from '@internationalized/date'
import { Calendar } from '@/components/ui/calendar'

const date = ref(fromDate(new Date(), getLocalTimeZone())) as Ref<DateValue>
</script>

<template>
  <div class="w-[270px]">
    <Calendar
        v-model="date"
        class="p-4 rounded-xl border border-slate-200 shadow-md bg-white"
        layout="month-and-year"
        :min-value="new CalendarDate(1925, 1, 1)"
        :max-value="new CalendarDate(2035, 1, 1)"
    />
  </div>
</template>

<style scoped>
</style>