export const TASKS_QUERY_KEYS = {
  all: ['tasks'] as const,
  byId: (id: string) => ['tasks', id] as const,
}