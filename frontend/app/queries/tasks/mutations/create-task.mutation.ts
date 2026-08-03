import {useQueryCache} from "@pinia/colada";
import {createTask} from "~/queries/tasks/tasks.api";
import {type CreateTaskDto, type Task, TaskStatus} from "~/queries/tasks/tasks.dto";
import {TASKS_QUERY_KEYS} from "~/queries/tasks/tasks.keys";
import {AUTH_QUERY_KEYS} from "~/queries/auth/auth.keys";
import type {CurrentUser} from "~~/types/user.types";

export const useCreateTaskMutation = () => {
  const queryCache = useQueryCache()

  const currentUser = queryCache.getQueryData<CurrentUser>(AUTH_QUERY_KEYS.currentUser())
  if (!currentUser) {
    throw new Error("User does not exist");
  }

  return useMutation({
    mutation: createTask,

    async onMutate(input: CreateTaskDto) {
      await queryCache.cancelQueries({key: TASKS_QUERY_KEYS.all})

      const oldTasks = queryCache.getQueryData<Task[]>(TASKS_QUERY_KEYS.all)

      const tempTask: Task = {
        id: crypto.randomUUID(),
        title: input.title || '',
        description: input.description || '',
        status: TaskStatus.NOT_STARTED,
        dueDate: input.dueDate,
        createdById: currentUser.id,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }

      const newTasks = oldTasks ? [tempTask, ...oldTasks] : [tempTask]

      queryCache.setQueryData<Task[]>(TASKS_QUERY_KEYS.all, newTasks)
      return { oldTasks, newTasks, tempId: tempTask.id }
    },

    onError(_error, _input, context) {
      if (!context) return

      const current = queryCache.getQueryData(TASKS_QUERY_KEYS.all)
      if (current === context.newTasks) {
        queryCache.setQueryData(TASKS_QUERY_KEYS.all, context.oldTasks)
      }
    },

    async onSuccess(task, _input, context) {
      queryCache.setQueryData<Task[]>(TASKS_QUERY_KEYS.all, old => {
        if (!old) return [task]
        return old.map(item => item.id === context?.tempId ? task : item)
      })
    },

    async onSettled(_data, _error, _input, context) {
      if (context) {
        await queryCache.invalidateQueries({ key: TASKS_QUERY_KEYS.all })
        await queryCache.invalidateQueries({ key: TASKS_QUERY_KEYS.groupedByStatus() })
      }
    }
  })
}