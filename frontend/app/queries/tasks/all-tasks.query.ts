import {TASKS_QUERY_KEYS} from "~/queries/tasks/tasks.keys";
import {getAllTasks} from "~/queries/tasks/tasks.api";

export const useTasksQuery = () => {
  return useQuery({
    key: ()=> TASKS_QUERY_KEYS.all,
    query: () => getAllTasks(),
    staleTime: 1000 * 60
  });
}