import z from 'zod'

export const createNoteSchema = z.object({
  title: z.string().max(50),
  content: z.string().max(150),
})