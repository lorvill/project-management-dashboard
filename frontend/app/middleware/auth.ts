import {getCurrentUser} from "~/utils/auth/auth.utils";

export default defineNuxtRouteMiddleware(async (to) => {
  const queryCache = useQueryCache()
  const entry = queryCache.ensure(getCurrentUser)

  const { data: user } = await queryCache.refresh(entry)

  if (!user) {
    return navigateTo({
      name: 'login',
      query: {
        redirect: to.fullPath,
      },
    })
  }
})
