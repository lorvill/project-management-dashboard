import {useQuery} from "@pinia/colada";
import {NOTES_QUERY_KEYS} from "~/api/notes/notes.keys";
import {getNote} from "~/api/notes/notes.api";

export const useCurrentNotesQuery = (id: string) => {
  return useQuery({
    key: NOTES_QUERY_KEYS.current(id),
    query: () => getNote(id),
  })
}