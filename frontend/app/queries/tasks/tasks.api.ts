import {apiFetch} from "~/queries/api";
import type {CreateTaskDto, Task, UpdateTaskDto} from "~/queries/tasks/tasks.dto";

export const getAllTasks = () : Promise<Task[]>=> {
  return apiFetch('/tasks', { method: 'GET' })
};

export const createTask = (dto: CreateTaskDto): Promise<Task> => {
  return apiFetch(`/tasks`, {
    method: 'POST',
    body: dto,
  })
};

export const updateTask = ({id, ...dto}: { id: string } & UpdateTaskDto) => {
  return apiFetch(`/tasks/${id}`, {
    method: 'PATCH',
    body: dto,
  })
}

export const deleteTask = (id: string): Promise<void> => {
  return apiFetch(`/tasks/${id}`, {
    method: 'DELETE'
  })
}