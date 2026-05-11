import {defineMutation, useMutation, useQueryCache} from "@pinia/colada";
import {loginUser, logoutUser, registerUser} from "~/queries/auth/auth.api";
import {AUTH_QUERY_KEYS} from "~/queries/auth/auth.keys";

export const useAuthMutations = defineMutation(() => {
    const queryCache = useQueryCache()
    const route = useRoute()

    const setUser = (response: any) => {
        queryCache.setQueryData(AUTH_QUERY_KEYS.currentUser(), response?.user ?? response)
    }

    const getAuthRedirect = () => {
        const redirect = route.query.redirect

        return typeof redirect === 'string' && redirect.startsWith('/') ? redirect : null
    }

    const registerMutation = useMutation({
        mutation: registerUser,
        async onSuccess(response) {
            setUser(response)
            await navigateTo(getAuthRedirect() ?? { name: 'dashboard' })
        },
    })

    const loginMutation = useMutation({
        mutation: loginUser,
        async onSuccess(response) {
            setUser(response)
            await navigateTo(getAuthRedirect() ?? { name: 'dashboard' })
        },
    })

    const logoutMutation = useMutation({
        mutation: logoutUser,
        async onSuccess() {
            queryCache.setQueryData(AUTH_QUERY_KEYS.currentUser(), null)

            await navigateTo({ name: 'login' })
        },
    })

    return {
        registerMutation,
        loginMutation,
        logoutMutation,
    }
})
