import { MaybeRefOrGetter, toValue } from 'vue'

type AnyFn = (...args: never[]) => unknown
type DebouncedReturn<T extends AnyFn> = Awaited<ReturnType<T>> | null
type DebouncedResolve<T extends AnyFn> = (value: DebouncedReturn<T> | PromiseLike<DebouncedReturn<T>>) => void

interface DebouncedFn<T extends AnyFn> {
  (this: ThisParameterType<T>, ...args: Parameters<T>): Promise<DebouncedReturn<T>>
  cancel: () => void
}

interface Options {
  rejectOnCancel: boolean
}

export function useDebounceFn<T extends AnyFn>(
  fn: T,
  ms: MaybeRefOrGetter<number>,
  options: Options = { rejectOnCancel: false }
): DebouncedFn<T> {
  let timer: ReturnType<typeof setTimeout> | null = null
  let lastResolve: DebouncedResolve<T> | null = null
  let lastReject: ((value?: unknown) => void) | null = null
  const { rejectOnCancel = false } = options

  function cancel() {
    if (timer !== null) {
      clearTimeout(timer)
      timer = null

      if (rejectOnCancel) {
        lastReject?.()
      } else {
        lastResolve?.(null)
      }

      lastReject = null
      lastResolve = null
    }
  }

  function debounced(this: ThisParameterType<T>, ...args: Parameters<T>) {
    cancel()
    const duration = toValue(ms)

    return new Promise<DebouncedReturn<T>>((resolve, reject) => {
      lastResolve = resolve
      lastReject = reject
      timer = setTimeout(() => {
        timer = null
        lastResolve = null
        lastReject = null

        try {
          Promise.resolve(fn.apply(this, args) as ReturnType<T>)
            .then((value) => resolve(value))
            .catch(reject)
        } catch (error) {
          reject(error)
        }
      }, duration)
    })
  }

  debounced.cancel = cancel
  return debounced
}
