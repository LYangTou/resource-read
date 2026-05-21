<template>
  <section class="page">
    <div class="page__header">
      <p class="eyebrow">Package</p>
      <h1>Stores</h1>
      <p>展示 stores 包导出的自定义 store。</p>
    </div>

    <DemoCard title="任务进度" tag="custom store" :description="`${store.doneCount}/${store.totalCount} 已完成`">
      <ul class="task-list">
        <li v-for="item in store.items" :key="item.id">
          <label>
            <input type="checkbox" :checked="item.done" @change="store.toggleItem(item.id)" />
            <span>{{ item.title }}</span>
          </label>
        </li>
      </ul>
    </DemoCard>
  </section>
</template>

<script setup lang="ts">
import { DemoCard } from '@resource-read/components';
import { useDemoStore } from '@resource-read/stores';

const store = useDemoStore();
</script>
