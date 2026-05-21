
import { Ref, ref, MaybeRef, isRef, unref, toValue, shallowRef } from 'vue'

export type UserCounterFunction = (n: number) => number

export interface UseCounterReturn {
    count: Ref<number>
    inc: UserCounterFunction
    dec: UserCounterFunction
    get: () => number
    set: UserCounterFunction
    reset: UserCounterFunction
}

export interface UseCounterOptions {
    min?: number
    max?: number
}



export function useCounter(initial: MaybeRef<number> = 0, options: UseCounterOptions = {}): UseCounterReturn {
    
    const count = shallowRef(initial)
    let cacheCount = unref(initial)
    const { max = Number.POSITIVE_INFINITY, min = Number.NEGATIVE_INFINITY, } = options


    function inc (n: number = 1) {
        count.value = Math.max(Math.min(count.value + n, max), min)
        return count.value
    }

    function dec (n: number = 1) {
        count.value = Math.min(Math.max(count.value - n, min), max)
        return count.value
    }

    function get () {
        return count.value
    }

    function set (n: number) {
        count.value = Math.max(min, Math.min(max, n))
        return count.value
    }

    function reset (val = cacheCount) {
        cacheCount = val
        return set(val)
    }

    return {
        count,
        inc,
        dec,
        get,
        set,
        reset
    }
}