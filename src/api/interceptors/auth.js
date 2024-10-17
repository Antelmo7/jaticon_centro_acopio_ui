import {
  baseRequestInterceptor,
  baseResponseInterceptor,
  baseErrorHandler
} from '@/api/interceptors/base'
import { UserKey } from '@/constants/local_storage'

export const authRequestInterceptor = async (config) => {
  try {
    config = await baseRequestInterceptor(config)
    config.withCredentials = true
    return config
  } catch (error) {
    return baseErrorHandler(error)
  }
}

export const authResponseInterceptor = async (response) => {
  try {
    response = await baseResponseInterceptor(response)
    if (response.status === 401) {
      localStorage.removeItem(UserKey)
    }
    return response
  } catch (error) {
    return baseErrorHandler(error)
  }
}