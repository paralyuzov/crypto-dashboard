import { ref, computed } from 'vue'
import type { AxiosError } from 'axios'

export function useApiState() {
  const _loading = ref(false)
  const _error = ref<string | null>(null)

  const loading = computed(() => _loading.value)
  const error = computed(() => _error.value)

  const run = async <T>(fn: () => Promise<T>): Promise<T> => {
    _loading.value = true
    _error.value = null

    try {
      const result = await fn()
      return result
    } catch (err: unknown) {
      let errorMessage = 'Unexpected error occurred'
      if (isAxiosError(err)) {
        errorMessage = err.response?.data?.message || err.message
      } else if (err instanceof Error) {
        errorMessage = err.message
      } else if (typeof err === 'string') {
        errorMessage = err
      }

      _error.value = errorMessage
      throw err
    } finally {
      _loading.value = false
    }
  }

  const reset = () => {
    _loading.value = false
    _error.value = null
  }

  const isAxiosError = (error: unknown): error is AxiosError<{ message?: string }> => {
    return typeof error === 'object' && error !== null && 'isAxiosError' in error
  }

  return {
    loading,
    error,
    run,
    reset,
  }
}
