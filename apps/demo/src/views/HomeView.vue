<template>
  <section class="page">
    <div class="page__header">
      <p class="eyebrow">Vue 3 + TypeScript + Turbo</p>
      <h1>Monorepo Demo</h1>
      <p>这个 demo 应用统一展示 composables、components、stores 和 request 四个包的基础功能。</p>
    </div>

    <div class="grid">
      <DemoCard
        v-for="item in packages"
        :key="item.name"
        :title="item.name"
        :tag="item.tag"
        :description="item.description"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import { DemoCard } from '@resource-read/components';

const packages = [
  {
    name: 'composables',
    tag: 'hooks',
    description: '存放自定义 hook 与工具方法，例如计数器和日期格式化。',
  },
  {
    name: 'components',
    tag: 'ui',
    description: '沉淀可复用 Vue 组件，demo 中使用 DemoCard 做展示。',
  },
  {
    name: 'stores',
    tag: 'custom store',
    description: '集中放置状态管理模块，当前示例提供任务进度 store。',
  },
  {
    name: 'request',
    tag: 'fetch',
    description: '封装 fetch 请求客户端，支持 query、json body 和错误类型。',
  },
];
</script>
