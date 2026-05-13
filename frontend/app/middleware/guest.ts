import {getCurrentUser} from "~/utils/auth/auth.utils";

export default defineNuxtRouteMiddleware(async () => {
    const user = await getCurrentUser()

    if (user) {
        return navigateTo({ name: 'dashboard' })
    }
})
