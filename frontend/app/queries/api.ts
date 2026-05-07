import { ofetch } from 'ofetch'

export const apiFetch = ofetch.create({
    baseURL: '/api',
    credentials: 'include',
})