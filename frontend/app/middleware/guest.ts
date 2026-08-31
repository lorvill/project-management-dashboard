import {getCurrentUser} from "~/utils/auth/auth.utils";

export default defineNuxtRouteMiddleware(async () => {
  const queryCache = useQueryCache()
  const entry = queryCache.ensure(getCurrentUser)

  const { data: user } = await queryCache.refresh(entry)

  if (user) {
    return navigateTo({ name: 'dashboard' })
  }
})
