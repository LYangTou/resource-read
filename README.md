# Vue 3 TS Turbo Monorepo

一个基于 Vue 3、TypeScript、Vue Router、Vitest 和 Turborepo 的 monorepo 示例项目。

## 目录

- `apps/demo`: demo 应用，集中展示各 package 能力。
- `packages/composables`: 自定义 hooks 与工具方法。
- `packages/components`: 自定义 Vue 组件。
- `packages/stores`: 自定义状态管理封装，提供类似 Pinia 的 `defineStore` 用法。
- `packages/request`: 请求工具封装。
- `notes`: 项目笔记。

## 命令

```bash
npm install
npm run dev
npm run build
npm run test
npm run type-check
```
