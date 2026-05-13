import {AUTH_QUERY_KEYS} from "~/queries/auth/auth.keys";
import {useQueryCache} from "@pinia/colada";
import type {AuthResponse} from "~~/types/user.types";
import {getUser} from "~/queries/user/user.api";
import {FetchError} from "ofetch";

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

export const getCurrentUser = async () => {
    const queryCache = useQueryCache()

    try {
        const user = await getUser()
        queryCache.setQueryData(
            AUTH_QUERY_KEYS.currentUser(),
            user
        )
        return user
    } catch (error) {
        if (error instanceof FetchError && error.statusCode === 401) {
            return null
        } throw error
    }
}
