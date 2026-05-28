import {loginUser} from "~/api/auth/auth.api";
import {getAuthRedirect, setUser} from "~/utils/auth/auth.utils";

export const useLoginMutation = defineMutation({
    mutation: loginUser,
    async onSuccess(response) {
        setUser(response)
        await navigateTo(getAuthRedirect())
    },
})