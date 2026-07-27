import {deleteTask} from "~/queries/tasks/tasks.api";
import {TASKS_QUERY_KEYS} from "~/queries/tasks/tasks.keys";

export const useDeleteTaskMutation = () => {
  const queryCache = useQueryCache()

  return useMutation({
    mutation: deleteTask,

    async onSuccess() {
      await queryCache.invalidateQueries({
        key: TASKS_QUERY_KEYS.all
      })
      await navigateTo({ name: 'tasks' })
    }
  })
}