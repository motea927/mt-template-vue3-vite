import { defineStore } from 'pinia'
import { useApi } from '@/composables/useApi'
import { getProduct as apiGetProduct } from '@/services/webApi'

type ProductStateType = {
  productName: string
}

const productState = (): ProductStateType => ({
  productName: ''
})

export const useProductStore = defineStore('product', {
  state: productState,
  actions: {
    async getProduct() {
      const { data } = await useApi(() => apiGetProduct({ id: '567' }))
      if (data.value) {
        this.$patch({ ...data.value })
      }
    }
  }
})
