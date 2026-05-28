export const NOTES_QUERY_KEYS = {
  all: ['notes'] as const,
  current: (id: string) => [...NOTES_QUERY_KEYS.all, id] as const,
}