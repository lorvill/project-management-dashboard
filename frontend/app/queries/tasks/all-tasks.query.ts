import {TASKS_QUERY_KEYS} from "~/queries/tasks/tasks.keys";
import {TaskSort, type TaskStatus} from "~/queries/tasks/tasks.dto";
import {getAllTasks} from "~/api/tasks.api";

export const useTasksQuery = (params?: {
  status: MaybeRefOrGetter<TaskStatus>; // now it's ref but if it was just 'TaskStatus' it wouldn't be ref, it would be just value
  sort: MaybeRefOrGetter<TaskSort>;
}) => {
  return useQuery({
    key: () => [
      ...TASKS_QUERY_KEYS.all,
      toValue(params?.status) ?? null,
      toValue(params?.sort) ?? null,
    ],
    query: () => getAllTasks({
      // status: unref(params?.status),
      status: toValue(params?.status),
      sort: toValue(params?.sort)
    }),
    staleTime: 1000 * 60 * 60
  });
}