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
