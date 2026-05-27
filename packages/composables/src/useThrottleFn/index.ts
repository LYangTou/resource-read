import type { MaybeRefOrGetter } from 'vue'
import { toValue } from 'vue'

type AnyFn = (...args: never[]) => unknown

export function useThrottleFn<T extends AnyFn>(
  fn: T,
  ms: MaybeRefOrGetter<number>,
  trailing = false,
  leading = true,
  rejectOnCancel = false
) {
  let timer: ReturnType<typeof setTimeout> | undefined
  let cacheTime: number | undefined
  let lastThis: ThisParameterType<T> | undefined
  let lastArgs: Parameters<T> | undefined
  let lastValue: Promise<Awaited<ReturnType<T>>> | undefined
  let cancelPending: (() => void) | undefined

  function invoke(thisArg: ThisParameterType<T>, args: Parameters<T>): Promise<Awaited<ReturnType<T>>> {
    cacheTime = Date.now()
    const value = Promise.resolve(fn.apply(thisArg, args) as ReturnType<T>)
    lastValue = value
    return value
  }

  function clearTrailing() {
    if (timer !== undefined) {
      clearTimeout(timer)
      timer = undefined
      cancelPending?.()
    }

    lastArgs = undefined
    lastThis = undefined
    cancelPending = undefined
  }

  function trailingInvoke(
    thisArg: ThisParameterType<T>,
    args: Parameters<T>,
    wait: number,
  ) {
    if (!trailing)
      return lastValue

    clearTrailing()

    lastArgs = args
    lastThis = thisArg

    lastValue = new Promise((resolve, reject) => {
      cancelPending = () => {
        if (rejectOnCancel)
          reject(new Error('Cancelled'))
        else
          resolve(undefined as Awaited<ReturnType<T>>)
      }

      timer = setTimeout(() => {
        timer = undefined
        cancelPending = undefined

        if (lastArgs !== undefined) {
          resolve(invoke(lastThis!, lastArgs))
          lastArgs = undefined
          lastThis = undefined
        }
      }, wait)
    })

    return lastValue
  }

  function throttle(this: ThisParameterType<T>, ...args: Parameters<T>) {
    const duration = toValue(ms)
    const nowTime = Date.now()

    if (duration <= 0) {
      clearTrailing()
      return invoke(this, args)
    }

    if (cacheTime === undefined) {
      cacheTime = nowTime

      if (leading)
        return invoke(this, args)

      return trailingInvoke(this, args, duration)
    }

    const elapsed = nowTime - cacheTime

    if (elapsed >= duration) {
      clearTrailing()
      return invoke(this, args)
    }

    return trailingInvoke(this, args, duration - elapsed)
  }

  return throttle
}
