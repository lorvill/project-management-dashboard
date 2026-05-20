import { apiFetch } from '~/api/api'

export const getUser = () => {
  return apiFetch('/user/profile', {
    method: 'GET',
  })
}