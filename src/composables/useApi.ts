import { ref } from 'vue'
import type { UnwrapRef } from 'vue'

export async function useApi<T>(api: () => Promise<T>) {
  const data = ref<T | null>(null)
  const error = ref<unknown>(null)

  try {
    const response = await api()
    // todo, add api error handler, sometimes may get custom error with status 200
    if (response) {
      data.value = response as UnwrapRef<T>
    }
  } catch (error_) {
    error.value = error_
    console.error(error_)
  } finally {
    // todo, maybe global loading animation
  }

  return {
    data,
    error
  }
}
