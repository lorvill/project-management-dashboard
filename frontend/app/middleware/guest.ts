import {useUserQuery} from "~/queries/user/user.queries";

export default defineNuxtRouteMiddleware(async () => {
    const { currentUserQuery } = useUserQuery()

    try {
        await currentUserQuery.refresh()

        if (currentUserQuery.data.value) {
            return navigateTo({ name: 'dashboard' })
        }
    } catch {
        console.log('no login')
    }
})