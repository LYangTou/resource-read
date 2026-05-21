# useToggle

`useToggle` 用于创建或复用一个 boolean 状态，并返回切换函数。

## 基础用法

```ts
import { useToggle } from "@resource-read/composables";

const [enabled, toggle] = useToggle(false);

toggle();
toggle(false);
```

## 设计点

- 非 `ref` 入参：返回内部 `shallowRef` 和 `toggle`。
- `ref` 入参：返回 `toggle`，用于粗浅监控和切换外部状态。
- 通过函数重载，让 TypeScript 能根据入参推断精确返回类型。

## 源码

<<< ../../packages/composables/src/useToggle/index.ts

## 函数重载

<<< ../../packages/composables/src/useToggle/index.ts{12-15}

同一个函数名，对外声明多种调用方式和对应返回类型；内部只实现一次。
前两行是重载签名，给调用者和 TS 类型推断看的。

最后一段是实现签名，是真正的函数实现。

TS 会根据传入参数选择最匹配的重载签名，所以返回类型更准确。

这样 TS 就知道

```ts
const toggle = useToggle(ref(false));
// toggle 是 ToggleFn

const [value, toggle] = useToggle(false);
// 返回值是 tuple，可以解构
```

如果不用重载，只写函数实现，那 TS 无法根据参数判断到底是哪一种，只能认为返回值“可能是数组，也可能是函数”。所以直接解构就会报错。

## shallowRef

<<< ../../packages/composables/src/useToggle/index.ts{21-23}

`shallowRef`可以理解成浅层`ref`，`ref`如果包住对象那么内部对象值也会变成响应式

```js
const state = ref({ count: 0 });

state.value.count++; // Vue 能追踪到这个变化
```

但`shallowRef`只追踪到`.value`这一层，不会把内部对象都递归成响应式

```js
const state = shallowRef({ count: 0 });

state.value.count++; // 不会触发依赖更新
state.value = { count: 1 }; // 会触发依赖更新
```

`useToggle`只是切换整个值，不关心内部属性变化，所以用`shallowRef`避免多余开销，而当传入的本身就是`ref`时，`shallowRef`会进行识别，直接返回原`ref`, 而不会再包一层。

```js
const isDark = shallowRef(true);
const _value = shallowRef(isDark);

// 改的就是 isDark.value。
_value.value = false;
```

## toValue

<<< ../../packages/composables/src/useToggle/index.ts{30-32}

将值、refs 或 getters 规范化为值。这与 unref() 类似，不同的是此函数也会规范化 getter 函数。如果参数是一个 getter，它将会被调用并且返回它的返回值。
