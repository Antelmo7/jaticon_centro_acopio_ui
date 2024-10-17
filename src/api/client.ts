import axios from 'axios'
import { HostKey } from '@/constants/api'

import { authRequestInterceptor, authResponseInterceptor } from '@/api/interceptors/auth'
import { baseErrorHandler } from '@/api/interceptors/base'

const axiosClient = axios.create({
  baseURL: HostKey,
  timeout: 10000,
})

axiosClient.interceptors.request.use(authRequestInterceptor, baseErrorHandler)
axiosClient.interceptors.response.use(authResponseInterceptor, baseErrorHandler)

export { axiosClient }
