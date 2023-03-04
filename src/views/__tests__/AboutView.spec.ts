import { describe, it, expect, vi } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'
import { useProductStore } from '@/stores/product'
import { product } from '@/mocks/mockData'

import AboutView from '@/views/AboutView.vue'

describe('AboutView.vue', () => {
  it('API should be called', () => {
    mount(AboutView, {
      global: {
        plugins: [
          createTestingPinia({
            createSpy: vi.fn
          })
        ]
      }
    })

    const productStore = useProductStore()
    expect(productStore.getProduct).toBeCalledTimes(1)
  })

  it('Should render product name', async () => {
    const wrapper = mount(AboutView, {
      global: {
        plugins: [createTestingPinia({ createSpy: vi.fn })]
      }
    })
    const productStore = useProductStore()
    productStore.productName = product.productName
    await flushPromises()
    expect(wrapper.html()).toContain(product.productName)
  })
})
