<template>
  <div class="flex gap-x-0.5 h-full items-end">
    <div
      v-for="i in 4"
      :key="i"
      class="w-0.5 bg-dark rounded-0.5"
      :style="{ height: (i + 1) * 20 + '%' }"
      :class="{ 'bg-wxhint': i > signal }"
    ></div>
  </div>
</template>

<script setup lang="ts">
  defineProps({
    signal: {
      type: Number,
      default: 2,
    },
  })
</script>
