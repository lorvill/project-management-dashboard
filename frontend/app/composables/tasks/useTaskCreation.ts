export function useTaskCreation() {
  const isCreatingTask = useState<boolean>(
    'tasks:is-creating-task',
    () => false,
  )

  function showNewTaskInput() {
    isCreatingTask.value = true
  }

  function closeNewTaskInput() {
    isCreatingTask.value = false
  }

  return {
    isCreatingTask,
    showNewTaskInput,
    closeNewTaskInput,
  }
}
