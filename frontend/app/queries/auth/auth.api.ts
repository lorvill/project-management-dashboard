import type {RegisterDto, LoginDto} from "~/queries/auth/auth.dto";
import {apiFetch} from "~/queries/api";

export const registerUser = (dto: RegisterDto) => {
    return apiFetch(`/auth/register`, {
        method: 'POST',
        body: dto
    })
}

export const loginUser = (dto: LoginDto) => {
    return apiFetch(`/auth/login`, {
        method: 'POST',
        body: dto
    })
}

export const logoutUser = () => {
    return apiFetch(`/auth/logout`, {
        method: 'POST'
    })
}
