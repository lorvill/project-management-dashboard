import type { Note } from '~~/types/note.types'
import { createNote } from '~/api/notes/notes.api'
import { NOTES_QUERY_KEYS } from '~/api/notes/notes.keys'
import type {CreateNoteDto} from "~/api/notes/notes.dto";
import { useQueryCache } from '@pinia/colada'

export const useCreateNoteMutation = () => {
  const queryCache = useQueryCache()

  return useMutation({
    mutation: createNote,

    async onMutate(input: CreateNoteDto) {
      const previousNotes = queryCache.getQueryData<Note[]>(NOTES_QUERY_KEYS.all)

      const tempNote: Note = {
        id: crypto.randomUUID(),
        title: input.title || 'Untitled',
        content: input.content || '',
        pinned: false,
        createdAt: new Date().toISOString(),
      }

      queryCache.setQueryData<Note[]>(NOTES_QUERY_KEYS.all, old => {
        return old ? [tempNote, ...old] : [tempNote]
      })

      return { previousNotes, tempId: tempNote.id }
    },

    onError(_error, _input, context) {
      queryCache.setQueryData(NOTES_QUERY_KEYS.all, context?.previousNotes ?? [])
    },

    async onSuccess(note, _input, context) {
      queryCache.setQueryData<Note[]>(NOTES_QUERY_KEYS.all, old => {
        if (!old) return [note]
        return old.map(item => item.id === context?.tempId ? note : item)
      })
    },

    async onSettled() {
      await queryCache.invalidateQueries({ key: NOTES_QUERY_KEYS.all })
    },
  })
}
