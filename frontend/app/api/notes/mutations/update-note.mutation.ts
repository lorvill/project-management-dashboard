import { updateNote } from '~/api/notes/notes.api'
import { NOTES_QUERY_KEYS } from '~/api/notes/notes.keys'
import type {UpdateNoteDto} from "~/api/notes/notes.dto";
import type {Note} from "~~/types/note.types";

export const useUpdateNoteMutation = () => {
  const queryCache = useQueryCache()

  return useMutation({
    mutation: updateNote,

    async onMutate(input: { id: string } & UpdateNoteDto) {
      const previousNote = queryCache.getQueryData<Note>(
        NOTES_QUERY_KEYS.current(input.id)
      )

      const previousNotes = queryCache.getQueryData<Note[]>(
        NOTES_QUERY_KEYS.all
      )

      const optimisticNote = {
        ...previousNote,
        ...input,
        updatedAt: new Date().toISOString(),
      } as Note

      queryCache.setQueryData<Note>(
        NOTES_QUERY_KEYS.current(input.id),
        old => {
          if (!old) return optimisticNote
          return { ...old, ...input, updatedAt: new Date().toISOString() }
        }
      )

      queryCache.setQueryData<Note[]>(
        NOTES_QUERY_KEYS.all,
        old => {
          if (!old) return old

          return old.map(note =>
            note.id === input.id
              ? { ...note, ...input, updatedAt: new Date().toISOString() }
              : note
          )
        }
      )

      return { previousNote, previousNotes }
    },

    onError(_error, input, context) {
      queryCache.setQueryData(
        NOTES_QUERY_KEYS.current(input.id),
        context?.previousNote
      )

      queryCache.setQueryData(
        NOTES_QUERY_KEYS.all,
        context?.previousNotes
      )
    },

    async onSettled(_note, _error, input) {
      await queryCache.invalidateQueries({
        key: NOTES_QUERY_KEYS.current(input.id),
      })

      await queryCache.invalidateQueries({
        key: NOTES_QUERY_KEYS.all,
      })
    },
  })
}
