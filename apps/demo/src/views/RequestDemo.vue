<template>
  <section class="page">
    <div class="page__header">
      <p class="eyebrow">Package</p>
      <h1>Request</h1>
      <p>展示 request 包的请求客户端封装。</p>
    </div>

    <DemoCard title="createRequestClient" tag="fetch" description="点击按钮使用 mock fetcher 发起一次请求。">
      <div class="actions">
        <button type="button" @click="loadProfile">加载用户</button>
      </div>

      <pre class="code-block">{{ result }}</pre>
    </DemoCard>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { DemoCard } from '@resource-read/components';
import { createRequestClient } from '@resource-read/request';

const result = ref('尚未请求');

const client = createRequestClient({
  baseUrl: 'https://demo.local',
  fetcher: async () =>
    new Response(
      JSON.stringify({
        id: 1,
        name: 'Demo User',
        role: 'admin',
      }),
      {
        status: 200,
        headers: { 'content-type': 'application/json' },
      },
    ),
});

async function loadProfile() {
  const data = await client.get('/profile', {
    query: {
      include: 'roles',
    },
  });

  result.value = JSON.stringify(data, null, 2);
}
</script>
