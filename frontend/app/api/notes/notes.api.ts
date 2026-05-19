import {apiFetch} from "~/api/api";
import type {CreateNoteDto, Note} from "~/api/notes/notes.dto";
import type {RouteParamValue} from "vue-router";

export const createNote = (dto: CreateNoteDto): Promise<Note> => {
  return apiFetch(`/notes`, {
    method: 'POST',
    body: dto
  })
}

export const getAllNotes = () => {
  return apiFetch(`/notes`, {
    method: 'GET',
  })
}

export const getNote = (id: string | RouteParamValue[] | undefined) => {
  return apiFetch<void>(`/notes/${id}`, {
    method: 'GET'
  })
}

export const removeNote = (id: string) => {
  return apiFetch<void>(`/notes/${id}`, {
    method: 'DELETE'
  })
}