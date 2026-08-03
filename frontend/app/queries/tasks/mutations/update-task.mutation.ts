import {updateTask} from "~/queries/tasks/tasks.api";
import type {Task, UpdateTaskDto} from "~/queries/tasks/tasks.dto";
import {TASKS_QUERY_KEYS} from "~/queries/tasks/tasks.keys";

export const useUpdateTaskMutation = () => {
  const queryCache = useQueryCache()

  return useMutation({
    mutation: updateTask,

    async onMutate(input: { id: string } & UpdateTaskDto) {
      await queryCache.cancelQueries({ key: TASKS_QUERY_KEYS.byId(input.id) })
      await queryCache.cancelQueries({ key: TASKS_QUERY_KEYS.all })

      const oldTask = queryCache.getQueryData<Task>(TASKS_QUERY_KEYS.byId(input.id))
      const oldTasks = queryCache.getQueryData<Task[]>(TASKS_QUERY_KEYS.all)

      const tempTask = {
        ...oldTask,
        ...input,
        updatedAt: new Date().toISOString()
      } as Task

      queryCache.setQueryData<Task>(TASKS_QUERY_KEYS.byId(input.id), tempTask)

      if (oldTasks) {
        const optimisticTasks = oldTasks.map(task =>
          task.id === input.id
            ? { ...task, ...tempTask }
            : task
        )

        queryCache.setQueryData<Task[]>(TASKS_QUERY_KEYS.all, optimisticTasks)
      }

      return {
        oldTask,
        oldTasks,
      }
    },

    async onError(_error, input, context) {
      if (!context) return

      queryCache.setQueryData(TASKS_QUERY_KEYS.byId(input.id), context.oldTask)
      queryCache.setQueryData(TASKS_QUERY_KEYS.all, context.oldTasks)
    },

    async onSettled(_task, _err, input) {
      await queryCache.invalidateQueries({
        key: TASKS_QUERY_KEYS.byId(input.id)
      })
      await queryCache.invalidateQueries({
        key: TASKS_QUERY_KEYS.all
      })
      await queryCache.invalidateQueries({
        key: TASKS_QUERY_KEYS.groupedByStatus()
      })
    }
  }
)}
