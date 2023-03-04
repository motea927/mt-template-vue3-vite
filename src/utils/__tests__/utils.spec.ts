import { describe, it, expect, vi } from 'vitest'
import { camelizeKey, snakifyKey, debounce } from '@/utils/utils'

describe('utils', () => {
  describe('transform json key', () => {
    it('camelizeKey convert correct', () => {
      const originalData = {
        product_id: 666,
        product_price: 1270,
        product_image: 'http://',
        product_categories: ['cat1', 'cat2'],
        in_stock: true,
        null_test: null,
        nested_object: {
          some_array: ['1', '6'],
          some_number: 5
        }
      }

      const expectData = {
        productId: 666,
        productPrice: 1270,
        productImage: 'http://',
        productCategories: ['cat1', 'cat2'],
        inStock: true,
        nullTest: null,
        nestedObject: {
          someArray: ['1', '6'],
          someNumber: 5
        }
      }

      expect(camelizeKey(originalData)).toEqual(expectData)
    })

    it('snakify convert correct', () => {
      const originalData = {
        productId: 666,
        productPrice: 1270,
        productImage: 'http://',
        productCategories: ['cat1', 'cat2'],
        inStock: true,
        nullTest: null,
        nestedObject: {
          someArray: ['1', '6'],
          someNumber: 5
        }
      }

      const expectData = {
        product_id: 666,
        product_price: 1270,
        product_image: 'http://',
        product_categories: ['cat1', 'cat2'],
        in_stock: true,
        null_test: null,
        nested_object: {
          some_array: ['1', '6'],
          some_number: 5
        }
      }

      expect(snakifyKey(originalData)).toEqual(expectData)
    })
  })

  describe('timer', () => {
    it('debounce should delay function call', () => {
      const mockFn = vi.fn()
      const debouncedFn = debounce(mockFn, 100)

      debouncedFn()
      expect(mockFn).not.toBeCalled()

      setTimeout(() => {
        expect(mockFn).toBeCalled()
      }, 200)
    })

    it('debounce should immediately call function', () => {
      const mockFn = vi.fn()
      const debouncedFn = debounce(mockFn, 100, true)

      debouncedFn()
      expect(mockFn).toBeCalled()

      setTimeout(() => {
        expect(mockFn).toHaveBeenCalledTimes(1)
      }, 200)
    })
  })
})
