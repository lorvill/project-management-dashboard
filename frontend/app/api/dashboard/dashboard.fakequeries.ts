import { defineQuery, useQuery } from '@pinia/colada'
import { getDashboard } from '~/api/dashboard/dashboard.fakeapi'

export const DASHBOARD_QUERY_KEYS = {
    dashboard: () => ['dashboard'],
}

export const useDashboardQuery = defineQuery(() => {
    const dashboardQuery = useQuery({
        key: DASHBOARD_QUERY_KEYS.dashboard(),
        query: getDashboard,
        enabled: import.meta.client,
        staleTime: 1000 * 60,
    })

    return { dashboardQuery }
})