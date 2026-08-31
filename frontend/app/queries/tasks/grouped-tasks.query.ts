import {TASKS_QUERY_KEYS} from "~/queries/tasks/tasks.keys";
import {getGroupedTasks} from "~/api/tasks.api";

export const useGroupedTasksQuery = () => {
  return useQuery({
    key: () =>
      TASKS_QUERY_KEYS.groupedByStatus(),
    query: getGroupedTasks,
    staleTime: 1000 * 60 * 60,
  })
}