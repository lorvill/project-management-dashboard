import { apiFetch } from '~/queries/api'

export const getUser = () => {
    const headers: Record<string, string> = {}
    if (import.meta.server) {
        headers.cookie = useRequestHeader('cookie')!
    }

    return apiFetch('/user/profile', {
            method: 'GET',
            headers
        })
}