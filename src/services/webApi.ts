import { axiosInstance } from '@/services/apiInstance'
import type { GetProductResponse } from '@/types/types'

const webApi = axiosInstance('/api')

export const getProduct = (params: { id: string }): Promise<GetProductResponse> => {
  return webApi.get('/product', { params })
}
