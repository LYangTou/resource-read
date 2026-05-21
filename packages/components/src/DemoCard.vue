<template>
  <section class="demo-card">
    <header class="demo-card__header">
      <h2>{{ title }}</h2>
      <span v-if="tag" class="demo-card__tag">{{ tag }}</span>
    </header>

    <p v-if="description" class="demo-card__description">{{ description }}</p>

    <div class="demo-card__content">
      <slot />
    </div>
  </section>
</template>

<script setup lang="ts">
defineProps<{
  title: string;
  tag?: string;
  description?: string;
}>();
</script>

<style scoped>
.demo-card {
  border: 1px solid #d8dee8;
  border-radius: 8px;
  background: #ffffff;
  padding: 20px;
  box-shadow: 0 10px 30px rgb(30 41 59 / 8%);
}

.demo-card__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.demo-card__header h2 {
  margin: 0;
  color: #172033;
  font-size: 20px;
}

.demo-card__tag {
  border-radius: 999px;
  background: #e8f2ff;
  color: #15579e;
  padding: 4px 10px;
  font-size: 12px;
  font-weight: 600;
}

.demo-card__description {
  margin: 10px 0 0;
  color: #5d6b82;
  line-height: 1.6;
}

.demo-card__content {
  margin-top: 16px;
}
</style>
