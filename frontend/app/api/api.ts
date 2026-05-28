import { ofetch } from 'ofetch'

export const apiFetch = ofetch.create({
    baseURL: import.meta.server
        ? 'http://localhost:5003'
        : '/api',
    credentials: 'include',
    onRequest({ options }) {
        if (import.meta.server) {
            const cookie = useRequestHeader('cookie')

            if (cookie) {
                const headers = new Headers(options.headers)
                headers.set('cookie', cookie)

                options.headers = headers
            }
        }
    }
})