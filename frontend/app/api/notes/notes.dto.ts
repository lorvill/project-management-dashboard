export interface CreateNoteDto {
  title: string;
  content?: string | null;
}

export type Note = {
  id: string
  title: string
  content?: string | null
  createdAt: string
  updatedAt: string
}
