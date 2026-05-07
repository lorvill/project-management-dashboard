import {defineMutation, useMutation, useQueryCache} from "@pinia/colada";
import {loginUser, logoutUser, registerUser} from "~/queries/auth/auth.api";
import {AUTH_QUERY_KEYS} from "~/queries/auth/auth.keys";

export const useAuthMutations = defineMutation(() => {
    const queryCache = useQueryCache()

    const setUser = (response: any) => {
        queryCache.setQueryData(AUTH_QUERY_KEYS.currentUser(), response?.user ?? response)
    }

    const registerMutation = useMutation({
        mutation: registerUser,
        async onSuccess(response) {
            setUser(response)
            await navigateTo({ name: 'dashboard' })
        },
    })

    const loginMutation = useMutation({
        mutation: loginUser,
        onSuccess(response) {
            setUser(response)
            navigateTo({ name: 'dashboard' })
        },
    })

    const logoutMutation = useMutation({
        mutation: logoutUser,
        onSuccess() {
            setUser(null)
            navigateTo({ name: 'login' })
        }
    })

    return {
        registerMutation,
        loginMutation,
        logoutMutation,
    }
})
