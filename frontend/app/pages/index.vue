<script setup lang="ts">
import Main from '~/components/dashboard/Main.vue'
import { useDashboardQuery } from '../queries/dashboard/dashboard.fakequeries'

definePageMeta({
  name: 'dashboard',
  middleware: 'auth',
})

const { dashboardQuery: { asyncStatus, data } } = useDashboardQuery()
</script>

<template>
  <div class="h-full min-h-0 overflow-hidden">
    <DashboardSkeleton v-if="asyncStatus === 'loading' || !data" />
    <Main v-else :data="data!" />
  </div>
</template>
