import type { JSONContent } from '@tiptap/vue-3'

export interface CreateNoteDto {
  title: string;
  content?: JSONContent | null;
}

export type Note = {
  id: string
  title?: string
  content?: JSONContent | null
  createdAt: string
  updatedAt: string
}

export interface UpdateNoteDto {
  title?: string,
  content?: JSONContent | null
}
