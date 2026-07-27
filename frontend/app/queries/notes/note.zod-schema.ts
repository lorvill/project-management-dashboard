import z from 'zod'
import type {JSONContent} from "@tiptap/vue-3";

export const createNoteSchema = z.object({
  title: z.string().max(100).optional(),
  content: z.custom<JSONContent>().nullable().optional()})