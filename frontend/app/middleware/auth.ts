import {getCurrentUser} from "~/utils/auth/auth.utils";

export default defineNuxtRouteMiddleware(async (to) => {
  const user = await getCurrentUser()

  if (!user) {
    return navigateTo({
      name: 'login',
      query: {
        redirect: to.fullPath
      }
    })
  }
})