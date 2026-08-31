import {getAuthRedirect, setUser} from "~/utils/auth/auth.utils";
import {loginUser} from "~/api/auth.api";

export const useLoginMutation = defineMutation({
    mutation: loginUser,
    async onSuccess(response) {
        setUser(response)
        await navigateTo(getAuthRedirect())
    },
})