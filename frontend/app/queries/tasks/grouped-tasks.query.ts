import {TASKS_QUERY_KEYS} from "~/queries/tasks/tasks.keys";
import {getGroupedTasks} from "~/queries/tasks/tasks.api";

export const useGroupedTasksQuery = () => {
  return useQuery({
    key: () =>
      TASKS_QUERY_KEYS.groupedByStatus(),
    query: getGroupedTasks,
    staleTime: 1000 * 60 * 60,
  })
}