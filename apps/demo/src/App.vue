<template>
  <div class="app-shell">
    <aside class="sidebar">
      <RouterLink class="brand" to="/">
        <span class="brand__mark">RR</span>
        <span>Resource Read</span>
      </RouterLink>

      <nav class="nav">
        <RouterLink v-for="item in navItems" :key="item.path" :to="item.path">
          {{ item.label }}
        </RouterLink>
      </nav>
    </aside>

    <main class="main">
      <RouterView />
    </main>
  </div>
</template>

<script setup lang="ts">
const navItems = [
  { path: '/', label: '总览' },
  { path: '/composables', label: 'Composables' },
  { path: '/components', label: 'Components' },
  { path: '/stores', label: 'Stores' },
  { path: '/request', label: 'Request' },
];
</script>
