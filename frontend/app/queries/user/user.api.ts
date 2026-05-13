import { apiFetch } from '~/queries/api'
import type {CurrentUser} from "~~/types/user.types";

export const getUser = () => {
    return apiFetch<CurrentUser>('/user/profile', {
        method: 'GET',
        headers: import.meta.server
            ? useRequestHeaders(['cookie'])
            : undefined,
    })
}