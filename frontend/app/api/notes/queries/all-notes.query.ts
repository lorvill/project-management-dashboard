import {defineQuery, useQuery} from "@pinia/colada";
import {NOTES_QUERY_KEYS} from "~/api/notes/notes.keys";
import {getAllNotes, getNote} from "~/api/notes/notes.api";

type NotesFilter = 'all' | 'pinned'
type SortOrder = 'newest' | 'oldest'

export const useNoteQuery = (params: {
  search: Ref<string>,
  active: Ref<NotesFilter>,
  sort: Ref<SortOrder>
}) => {
  return useQuery({
    key: () => [
      ...NOTES_QUERY_KEYS.all,
      params.search.value,
      params.active.value,
      params.sort.value
    ],
    query: () =>
      getAllNotes({
        search: params.search.value,
        active: params.active.value,
        sort: params.sort.value,
      }),
    staleTime: 1000 * 60 * 30
  })
}