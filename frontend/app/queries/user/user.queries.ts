import { defineQuery, useQuery } from '@pinia/colada'
import { getUser } from '~/queries/user/user.api'
import { AUTH_QUERY_KEYS } from '~/queries/auth/auth.keys'

export const useUserQuery = defineQuery(() => {
    const currentUserQuery = useQuery({
        key: AUTH_QUERY_KEYS.currentUser(),
        query: getUser,
        staleTime: 1000 * 60 * 30
    })

    return {
        currentUserQuery,
    }
})