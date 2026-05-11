import {useUserQuery} from "~/queries/user/user.queries";

export default defineNuxtRouteMiddleware(async () => {
    const { currentUserQuery } = useUserQuery()

    try {
        await currentUserQuery.refresh(true)
    } catch {
        return navigateTo({ name: 'login' })
    }
})