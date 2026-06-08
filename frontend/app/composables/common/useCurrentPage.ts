import {useRouteQuery} from "@vueuse/router";

export const useCurrentPage = () => useRouteQuery<number>('page', 1, { transform: Number })
