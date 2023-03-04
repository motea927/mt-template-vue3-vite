import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { getProduct } from '@/services/webApi'

import HomeView from '@/views/HomeView.vue'

vi.mock('@/services/webApi')

describe('HomeView.vue', () => {
  it('API should be called', () => {
    mount(HomeView)
    expect(getProduct).toBeCalledTimes(1)
  })
})
