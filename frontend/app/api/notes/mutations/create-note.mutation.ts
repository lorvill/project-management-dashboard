import {createNote} from "~/api/notes/notes.api";
import {NOTES_QUERY_KEYS} from "~/api/notes/notes.keys";

export const useCreateNoteMutation = defineMutation({
  mutation: createNote,

  async onSuccess(note) {
    const queryCache = useQueryCache()

    await queryCache.invalidateQueries({
      key: NOTES_QUERY_KEYS.all,
    })

    await navigateTo(`/notes/${note.id}`)
  },
})