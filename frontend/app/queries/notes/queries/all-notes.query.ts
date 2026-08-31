import {defineQuery, useQuery} from "@pinia/colada";
import {NOTES_QUERY_KEYS} from "~/queries/notes/notes.keys";
import {getAllNotes, getNote} from "~/api/notes.api";

type NotesFilter = 'all' | 'pinned'
type SortOrder = 'newest' | 'oldest'

export const useNoteQuery = (params?: {
  search?: Ref<string>,
  active?: Ref<NotesFilter>,
  sort?: Ref<SortOrder>,
  page?: Ref<number>,
  limit?: Ref<number>
}) => {
  return useQuery({
    key: () => [
      ...NOTES_QUERY_KEYS.all,
      params?.search?.value,
      params?.active?.value,
      params?.sort?.value,
      params?.page?.value
    ],
    query: () =>
      getAllNotes({
        search: params?.search?.value,
        active: params?.active?.value,
        sort: params?.sort?.value,
        page: params?.page?.value,
        limit: params?.limit?.value ?? 12,
      }),
    staleTime: 1000 * 60 * 30
  })
}