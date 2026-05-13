import {useMutation, useQueryCache} from "@pinia/colada";
import {logoutUser} from "~/queries/auth/auth.api";

const queryCache = useQueryCache()

export const useLogoutMutation = defineMutation({
    mutation: logoutUser,
    async onSuccess() {
        queryCache.cancelQueries()
        queryCache.getEntries().forEach((entry) => {
            queryCache.remove(entry)
        })
        await navigateTo({ name: 'login' })
    },
})
