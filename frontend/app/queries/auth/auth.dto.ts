export interface RegisterDto {
    email: string;
    name: string;
    password: string;
    confirmPassword: string;
}

export interface LoginDto {
    email: string;
    password: string;
}