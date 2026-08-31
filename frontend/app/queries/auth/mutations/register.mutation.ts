import {defineMutation} from "@pinia/colada";
import {registerUser} from "~/api/auth.api";
import {getAuthRedirect, setUser} from "~/utils/auth/auth.utils";

export const useRegisterMutation = defineMutation({
    mutation: registerUser,
    async onSuccess(response) {
        setUser(response)
        await navigateTo(getAuthRedirect())
    },
})