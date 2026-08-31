import {AUTH_QUERY_KEYS} from "~/queries/auth/auth.keys";
import {useQueryCache} from "@pinia/colada";
import type {AuthResponse, CurrentUser} from "~~/types/user.types";
import {getUser} from "~/api/user.api";
import {FetchError} from "ofetch";

export const redirectToGoogleAuth = () => {
  const config = useRuntimeConfig()
  window.location.href = `${config.public.apiBaseURL}/auth/google`
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

export const getCurrentUser = defineQueryOptions({
  key: AUTH_QUERY_KEYS.currentUser(),
  query: async () => {
    try {
      return await getUser()
    }
    catch (error) {
      if (error instanceof FetchError && error.statusCode === 401) {
        return null
      }
      throw error
    }
  }
})
