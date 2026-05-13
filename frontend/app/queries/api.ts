import { ofetch } from 'ofetch'

export const apiFetch = ofetch.create({
    baseURL: import.meta.server
        ? 'http://localhost:5003'
        : '/api',

    credentials: 'include',
})