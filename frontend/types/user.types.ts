export type AuthMethod = 'CREDENTIALS' | 'GOOGLE'

export interface CurrentUser {
    id: string
    email: string
    displayName: string
    picture?: string | null
    method: AuthMethod
    isVerified?: boolean
}

export interface AuthResponse {
    user: CurrentUser
}