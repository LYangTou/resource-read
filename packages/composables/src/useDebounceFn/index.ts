type AnyFn = (...args: any[]) => any

type DebouncedFn<T extends AnyFn> = {
    (
      this: ThisParameterType<T>,
      ...args: Parameters<T>
    ): Promise<Awaited<ReturnType<T>>>
    cancel: () => void
  }

interface Options {
    rejectOnCancel: boolean
}

export function useDebounceFn<T extends AnyFn> (fn: T, ms: number, options: Options = {
    rejectOnCancel: false
}): DebouncedFn<T> {
   let timer: ReturnType<typeof setTimeout> | null = null
   let lastResolve:  ((value: any) => void) | null = null
   let lastReject: ((value?: unknown) => void) | null = null
   const { rejectOnCancel = false } = options
   function cancel () {
        if (timer !== null) {
            clearTimeout(timer)
            timer = null
            rejectOnCancel ? lastReject?.() : lastResolve?.(null)
            lastReject = null
            lastResolve = null
        }
   }

   function debounced (this: ThisParameterType<T>, ...args: Parameters<T>) {
        cancel()
        return new Promise<Awaited<ReturnType<T>>>((resolve, reject) => {
            lastResolve = resolve
            lastReject = reject
            timer = setTimeout(() => {
                timer = null
                lastResolve = null
                lastReject = null
        
                try {
                    Promise.resolve(fn.apply(this, args))
                    .then(resolve)
                    .catch(reject)
                } catch (error) {
                    reject(error)
                }
            }, ms)
        })
   }

   debounced.cancel = cancel
   return debounced
}