import {apiFetch} from "~/api/api";
import type {CreateNoteDto, Note, UpdateNoteDto} from "~/api/notes/notes.dto";
import type {RouteParamValue} from "vue-router";

export const createNote = (dto: CreateNoteDto): Promise<Note> => {
  return apiFetch(`/notes`, {
    method: 'POST',
    body: dto
  })
}

export const getAllNotes = (): Promise<Note[]> => {
  return apiFetch(`/notes`, {
    method: 'GET',
  })
}

export const getNote = (id: string): Promise<Note> => {
  return apiFetch(`/notes/${id}`, {
    method: 'GET',
  })
}

export const updateNote = ({ id, ...dto }: { id: string } & UpdateNoteDto): Promise<Note> => {
  return apiFetch(`/notes/${id}`, {
    method: 'PATCH',
    body: dto
  })
}

export const removeNote = (id: string) => {
  return apiFetch<void>(`/notes/${id}`, {
    method: 'DELETE'
  })
}