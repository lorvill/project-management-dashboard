import {defineQuery, useQuery} from "@pinia/colada";
import {NOTES_QUERY_KEYS} from "~/api/notes/notes.keys";
import {getAllNotes, getNote} from "~/api/notes/notes.api";

export const useNoteQuery = defineQuery(() => {
  return useQuery({
    key: NOTES_QUERY_KEYS.all,
    query: getAllNotes,
    staleTime: 1000 * 60 * 30
  })
})