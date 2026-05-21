# 源码

<<< ../../packages/composables/src/useCounter/index.ts

## unRef

如果参数是 ref，则返回内部值，否则返回参数本身。这里不用`toValue`是因为要设置值，所以不能处理`getter`类型。
