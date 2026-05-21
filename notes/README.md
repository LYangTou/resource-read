# Notes

这里用于存放项目设计、开发记录和问题笔记。

## 初始结构

- 使用 npm workspaces 管理 `apps/*` 与 `packages/*`。
- 使用 Turborepo 编排 `dev`、`build`、`test`、`type-check` 等任务。
- demo 应用通过 Vue Router 展示四个基础包的能力。
- `stores` 包不依赖 Pinia，内部实现轻量的自定义 store 注册与复用机制。
