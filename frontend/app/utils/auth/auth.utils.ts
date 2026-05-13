import {AUTH_QUERY_KEYS} from "~/queries/auth/auth.keys";
import {useQueryCache} from "@pinia/colada";
import type {AuthResponse} from "~~/types/user.types";

export const redirectToGoogleAuth = () => {
    window.location.href = 'http://localhost:5003/auth/google'
}

export const getAuthRedirect = () => {
    const route = useRoute()
    const redirect = route.query.redirect

    return typeof redirect === 'string' && redirect.startsWith('/')
        ? redirect
        : { name: 'dashboard' }
}

export const setUser = (response: AuthResponse) => {
    const queryCache = useQueryCache()

    queryCache.setQueryData(
        AUTH_QUERY_KEYS.currentUser(),
        response.user
    )
}