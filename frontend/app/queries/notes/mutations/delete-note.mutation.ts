import {removeNote} from "~/queries/notes/notes.api";
import {NOTES_QUERY_KEYS} from "~/queries/notes/notes.keys";

export const useDeleteNoteMutation = defineMutation({
  mutation: removeNote,

  async onSuccess() {
    const queryCache = useQueryCache()

    await queryCache.invalidateQueries({
      key: NOTES_QUERY_KEYS.all,
    })

    await navigateTo(`/notes`)
  },
})