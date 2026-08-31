export const TASKS_QUERY_KEYS = {
  all: ['tasks'] as const,
  byId: (id: string) => ['tasks', id] as const,
  groupedByStatus: () => [
    ...TASKS_QUERY_KEYS.all,
    'counts',
    'status',
  ] as const,
}