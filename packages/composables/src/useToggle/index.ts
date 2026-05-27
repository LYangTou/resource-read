import { isRef, MaybeRef, shallowRef, toValue, ShallowRef, Ref } from 'vue'

export type ToggleFn = (value?: boolean) => void

export type UseToggleReturn = [ShallowRef<boolean>, ToggleFn] | ToggleFn

export interface useToggleOptions<T, F> {
  truthyValue?: T
  falseValue?: F
}

export function useToggle(initialValue: Ref<boolean>, options?: useToggleOptions<true, false>): ToggleFn
export function useToggle(initialValue?: MaybeRef<boolean>, options?: useToggleOptions<true, false>): [ShallowRef<boolean>, ToggleFn]
export function useToggle(initialValue: MaybeRef<boolean> = false, options: useToggleOptions<true, false> = {}): UseToggleReturn {
  const {
    truthyValue = true,
    falseValue = false
  } = options
  const isValueRef = isRef(initialValue)
  // only track the shallow value
  const _value = shallowRef(initialValue)

  function toggle(value?: boolean) {
    if (arguments.length) {
      _value.value = value!
      return _value.value
    }

    const truthy = toValue(truthyValue)
    _value.value = _value.value === truthy ? toValue(falseValue) : truthy
    return _value.value
  }

  if (isValueRef) {
    return toggle
  }
  return [_value, toggle] as const
}
