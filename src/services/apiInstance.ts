import axios from 'axios'
import type { AxiosResponse } from 'axios'
import { snakifyKey, camelizeKey } from '@/utils/utils'

const axiosInstance = (baseURL: string) => {
  const instance = axios.create({
    baseURL,
    headers: { 'Content-Type': 'application/json' }
  })

  // req
  instance.interceptors.request.use(
    (config) => {
      if (config.data) config.data = snakifyKey(config.data)
      if (config.params) config.params = snakifyKey(config.params)
      return config
    },
    (error) => {
      return Promise.reject(error)
    }
  )

  // res
  instance.interceptors.response.use(
    (response) => {
      return camelizeKey(response.data) as AxiosResponse
    },
    (error) => {
      return Promise.reject(error)
    }
  )
  return instance
}

export { axiosInstance }
