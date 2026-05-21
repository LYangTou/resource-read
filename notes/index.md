# Resource Read Notes

<script setup lang="ts">
import { withBase } from 'vitepress';
import { data as composables } from './composables.data';
</script>

这里用于记录源码阅读、设计思路和问题复盘。

## 当前能力

- Markdown 笔记可以通过 VitePress 在网页中访问。
- 笔记可以直接引用 `packages` 下的源码，不需要复制粘贴。
- Markdown 中的 Vue 示例可以通过 `@resource-read/*` alias 引用源码入口。

## 快速开始

```bash
npm run notes:dev
```

打开本地文档站：

```text
http://127.0.0.1:5174
```

## 示例

<ul>
  <li v-for="item in composables" :key="item.link">
    <a :href="withBase(item.link)">{{ item.text }}</a>
  </li>
</ul>
