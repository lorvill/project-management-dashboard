import {apiFetch} from "~/api/api";
import type {CreateNoteDto, Note, PaginatedResponse, UpdateNoteDto} from "~/api/notes/notes.dto";

export const createNote = (dto: CreateNoteDto): Promise<Note> => {
  return apiFetch(`/notes`, {
    method: 'POST',
    body: dto
  })
}

export const getAllNotes = (params?: {
  search?: string
  active?: 'all' | 'pinned'
  sort?: 'newest' | 'oldest'
  page?: number
  limit?: number
}): Promise<PaginatedResponse<Note>> => {
  return apiFetch('/notes', {
    method: 'GET',
    query: params,
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
    body: dto,
    keepalive: true,
  })
}

export const removeNote = (id: string) => {
  return apiFetch<void>(`/notes/${id}`, {
    method: 'DELETE'
  })
}