import {useUserQuery} from "~/queries/user/user.queries";

export default defineNuxtRouteMiddleware(async (to) => {
    const { currentUserQuery } = useUserQuery()

    try {
        await currentUserQuery.refresh()
    } catch {
        return navigateTo({
            name: 'login',
            query: {
                redirect: to.fullPath,
            },
        })
    }
})