<template>
  <section class="page">
    <div class="page__header">
      <p class="eyebrow">Package</p>
      <h1>Components</h1>
      <p>展示 components 包导出的 DemoCard 组件。</p>
    </div>

    <DemoCard title="DemoCard" tag="component" description="一个用于 demo 页面展示内容块的基础组件。">
      <div class="sample-panel">
        <span>插槽内容</span>
        <button type="button">确认</button>
      </div>
    </DemoCard>
  </section>
</template>

<script setup lang="ts">
import { DemoCard } from '@resource-read/components';
</script>
