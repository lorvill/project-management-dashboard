import {useQueryCache} from "@pinia/colada";
import {logoutUser} from "~/api/auth.api";

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
