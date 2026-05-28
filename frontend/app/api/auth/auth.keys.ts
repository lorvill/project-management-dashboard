export const AUTH_QUERY_KEYS = {
    root: ['auth'] as const,
    currentUser: () => [...AUTH_QUERY_KEYS.root, 'currentUser'] as const,
}