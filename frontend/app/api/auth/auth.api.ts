import type {RegisterDto, LoginDto} from "~/api/auth/auth.dto";
import {apiFetch} from "~/api/api";
import type {AuthResponse} from "~~/types/user.types";

export const registerUser = (dto: RegisterDto) => {
    return apiFetch<AuthResponse>(`/auth/register`, {
        method: 'POST',
        body: dto
    })
}

export const loginUser = (dto: LoginDto) => {
    return apiFetch<AuthResponse>(`/auth/login`, {
        method: 'POST',
        body: dto
    })
}

export const logoutUser = () => {
    return apiFetch<void>(`/auth/logout`, {
        method: 'POST'
    })
}

export const forgotPassword = (email: string) => {
    return apiFetch<{exists: boolean}>(`/auth/forgot-password`, {
        method: 'POST',
        body: { email }
    })
}

export const resetPassword= (token: string, newPassword: string) => {
    return apiFetch<void>(`/auth/reset-password`, {
        method: 'PUT',
        body: { token, newPassword }
    })
}
