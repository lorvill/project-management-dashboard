<script setup lang="ts">
import Main from '~/components/dashboard/Main.vue'
import { useDashboardQuery } from '~/api/dashboard/dashboard.fakequeries'

definePageMeta({
  name: 'dashboard',
  middleware: 'auth',
})

const { dashboardQuery: { asyncStatus, data } } = useDashboardQuery()
</script>

<template>
  <div>
    <DashboardSkeleton v-if="asyncStatus === 'loading' || !data" />
    <Main v-else :data="data!" />
  </div>
</template>