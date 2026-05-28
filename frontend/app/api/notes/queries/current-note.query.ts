import {useQuery} from "@pinia/colada";
import {NOTES_QUERY_KEYS} from "~/api/notes/notes.keys";
import {getNote} from "~/api/notes/notes.api";

export const useCurrentNotesQuery = (id: MaybeRefOrGetter<string>) => {
  return useQuery({
    key: () => NOTES_QUERY_KEYS.current(toValue(id)),
    query: () => getNote(toValue(id)),
  })
}