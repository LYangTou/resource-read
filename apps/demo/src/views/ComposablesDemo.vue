<template>
  <section class="page">
    <div class="page__header">
      <p class="eyebrow">Package</p>
      <h1>Composables</h1>
      <p>useToggle basic demo.</p>
    </div>

    <DemoCard title="useToggle" tag="hook" description="Create an internal boolean state and switch it with toggle.">
      <div class="sample-panel">
        <span class="toggle-status" :class="{ 'toggle-status--active': enabled }">
          {{ enabled ? 'on' : 'off' }}
        </span>
        <div class="actions">
          <button type="button" @click="toggleEnabled()">toggle</button>
          <button type="button" @click="toggleEnabled(true)">on</button>
          <button type="button" @click="toggleEnabled(false)">off</button>
        </div>
      </div>
    </DemoCard>
  </section>
</template>

<script setup lang="ts">
import type { ShallowRef } from 'vue';
import { DemoCard } from '@resource-read/components';
import { useToggle } from '@resource-read/composables';

const [enabled, toggleEnabled] = useToggle(false) as [
  ShallowRef<boolean>,
  (value?: boolean) => void,
];
</script>

<style scoped>
.toggle-status {
  color: #5d6b82;
  font-weight: 700;
}

.toggle-status--active {
  color: #127a51;
}
</style>
