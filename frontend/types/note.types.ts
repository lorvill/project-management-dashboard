import type {JSONContent} from "@tiptap/vue-3";

export interface Note {
  id: string
  title?: string
  content?: JSONContent | null
  createdAt: string
  updatedAt: string
  pinned: boolean
}
