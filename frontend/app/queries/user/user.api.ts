import {apiFetch} from "~/queries/api";

export const getUser = () => {
    return apiFetch(`/user/profile`, {
        method: 'POST',
    })
}