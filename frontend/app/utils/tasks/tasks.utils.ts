import type { InjectionKey, Ref } from 'vue'

export interface TasksLayoutContext {
  isCreatingTask: Ref<boolean>
  showNewTaskInput: () => void
  closeNewTaskInput: () => void
}

export const tasksLayoutKey:
  InjectionKey<TasksLayoutContext> = Symbol('tasks-layout')